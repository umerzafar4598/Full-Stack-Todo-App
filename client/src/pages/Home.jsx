import { useState } from 'react';
import { Plus, Filter, Search, Inbox } from 'lucide-react';
import { useTodo } from '../context/TodoContext.jsx';
import Header from '../components/Header.jsx';
import Stats from '../components/Stats.jsx';
import TodoItem from '../components/TodoItem.jsx';
import TodoModal from '../components/TodoModal.jsx';
import { confirmDelete } from '../utils/sweetAlert.js';

const Home = () => {
  const { todos, loading, addTodo, updateTodo, toggleTodo, deleteTodo } = useTodo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState('all'); // all, completed, pending, overdue
  const [searchQuery, setSearchQuery] = useState('');

  const handleSaveTodo = async (todoData) => {
    if (editingTodo) {
      const result = await updateTodo(editingTodo.id, todoData);
      if (result.success) {
        setIsModalOpen(false);
        setEditingTodo(null);
      }
    } else {
      const result = await addTodo(todoData);
      if (result.success) {
        setIsModalOpen(false);
      }
    }
  };

  const handleEditTodo = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleDeleteTodo = async (id) => {
    const confirmed = await confirmDelete({
      title: 'Delete this todo?',
      text: 'This action cannot be undone!',
    });

    if (confirmed) {
      await deleteTodo(id);
    }
  };

  const handleToggleTodo = async (id) => {
    await toggleTodo(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTodo(null);
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        todo.title.toLowerCase().includes(query) ||
        (todo.description && todo.description.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    if (filter === 'overdue') {
      return (
        !todo.completed &&
        todo.deadline &&
        new Date(todo.deadline) < new Date()
      );
    }
    return true; // 'all'
  });

  const filterOptions = [
    { value: 'all', label: 'All Tasks', count: todos.length },
    {
      value: 'pending',
      label: 'Pending',
      count: todos.filter((t) => !t.completed).length,
    },
    {
      value: 'completed',
      label: 'Completed',
      count: todos.filter((t) => t.completed).length,
    },
    {
      value: 'overdue',
      label: 'Overdue',
      count: todos.filter(
        (t) => !t.completed && t.deadline && new Date(t.deadline) < new Date()
      ).length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#020617] relative">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(236,72,153,0.4), transparent)`,
        }}
      />
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Stats */}
        <Stats />

        {/* Controls */}
        <div className="card p-4 mb-6 animate__animated animate__fadeIn animate__slower ">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search todos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>

            {/* Filter & Add Button */}
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-initial">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Filter className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="input pl-10 pr-8 w-full md:w-auto appearance-none cursor-pointer"
                >
                  {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} ({option.count})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-primary flex items-center gap-2 whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">Add Todo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredTodos.length === 0 ? (
            <div className="card p-12 text-center">
              <Inbox className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {searchQuery
                  ? 'No todos found'
                  : filter === 'all'
                    ? 'No todos yet'
                    : `No ${filter} todos`}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery
                  ? 'Try adjusting your search query'
                  : 'Create your first todo to get started'}
              </p>
              {!searchQuery && filter === 'all' && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="btn btn-primary mx-auto"
                >
                  <Plus className="w-5 h-5 mr-2 inline" />
                  Create Todo
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3" >
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onEdit={handleEditTodo}
                  onDelete={handleDeleteTodo}
                />
              ))}

            </div>
          )}
        </div>
      </main>

      {/* Todo Modal */}
      <TodoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTodo}
        todo={editingTodo}
      />
    </div>
  );
};

export default Home;