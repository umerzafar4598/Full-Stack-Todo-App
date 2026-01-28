import express from 'express';
import pool from '../config/db.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();


router.use(isAuthenticated);

// Get all todos for the logged-in user
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM todos WHERE user_id =$1 ORDER BY CASE WHEN deadline IS NULL THEN 1 ELSE 0 END, deadline ASC, created_at DESC',
            [req.user.id]
        );

        res.json({
            success: true,
            todos: result.rows
        });
    } catch (error) {
        console.error('Error fetching todos:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch todos'
        });
    }
});

// Get a single todo by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'SELECT * FROM todos WHERE id = $1 AND user_id = $2',
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }

        res.json({
            success: true,
            todo: result.rows[0]
        });
    } catch (error) {
        console.error('Error fetching todo:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch todo'
        });
    }
});

// Get todo statistics
router.get('/stats/overview', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT 
         COUNT(*) as total,
         COUNT(CASE WHEN completed = true THEN 1 END) as completed,
         COUNT(CASE WHEN completed = false THEN 1 END) as pending,
         COUNT(CASE WHEN deadline < NOW() AND completed = false THEN 1 END) as overdue
       FROM todos 
       WHERE user_id = $1`,
            [req.user.id]
        );

        res.json({
            success: true,
            stats: result.rows[0]
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics'
        });
    }
});


// Create a new todo
router.post('/', async (req, res) => {
    try {
        const { title, description, deadline } = req.body;

        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            });
        }

        const result = await pool.query(
            'INSERT INTO todos (user_id, title, description, deadline) VALUES ($1, $2, $3, $4) RETURNING *',
            [req.user.id, title.trim(), description, deadline]
        );

        res.status(201).json({
            success: true,
            message: 'Todo created successfully',
            todo: result.rows[0]
        });
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create todo'
        });
    }
});

// Update a todo
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, deadline, completed } = req.body;

        // Check if todo exists and belongs to user
        const existingTodo = await pool.query(
            'SELECT * FROM todos WHERE id = $1 AND user_id = $2',
            [id, req.user.id]
        );

        if (existingTodo.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }

        const allowedFields = {
            title: 'title',
            description: 'description',
            deadline: 'deadline',
            completed: 'completed'
        };

        const updates = [];
        const values = [];
        let paramCount = 1;

        if (title !== undefined) {
            if (title.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'Title cannot be empty'
                });
            }
            updates.push(`${allowedFields.title} = $${paramCount++}`);
            values.push(title.trim());
        }

        if (description !== undefined) {
            updates.push(`${allowedFields.description} = $${paramCount++}`);
            values.push(description === '' ? null : description);
        }

        if (deadline !== undefined) {
            updates.push(`${allowedFields.deadline} = $${paramCount++}`);
            values.push(deadline === '' ? null : deadline);
        }

        if (completed !== undefined) {
            if (typeof completed !== 'boolean') {
                return res.status(400).json({
                    success: false,
                    message: 'Completed must be boolean'
                });
            }
            updates.push(`${allowedFields.completed} = $${paramCount++}`);
            values.push(completed);
        }

        if (updates.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No fields to update'
            });
        }

        updates.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id, req.user.id);

        const result = await pool.query(
            `UPDATE todos 
       SET ${updates.join(', ')} 
       WHERE id = $${paramCount++} AND user_id = $${paramCount++}
       RETURNING *`,
            values
        );

        res.json({
            success: true,
            message: 'Todo updated successfully',
            todo: result.rows[0]
        });
    } catch (error) {
        console.error('Error updating todo:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update todo'
        });
    }
});

// Toggle todo completion status
router.patch('/:id/toggle', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            `UPDATE todos 
       SET completed = NOT completed, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $1 AND user_id = $2 
       RETURNING *`,
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }

        res.json({
            success: true,
            message: 'Todo status toggled successfully',
            todo: result.rows[0]
        });
    } catch (error) {
        console.error('Error toggling todo:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to toggle todo status'
        });
    }
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *',
            [id, req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }

        res.json({
            success: true,
            message: 'Todo deleted successfully',
            todo: result.rows[0]
        });
    } catch (error) {
        console.error('Error deleting todo:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete todo'
        });
    }
});


export default router;