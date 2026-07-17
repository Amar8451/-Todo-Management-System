import React, { useRef, useEffect } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useTasks } from '../hooks/useTasks';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useTasks();
  const inputRef = useRef(null);

  // Clear search field
  const handleClear = () => {
    setSearchQuery('');
    inputRef.current?.focus();
  };

  // Keyboard shortcut 's' or '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 's' || e.key === '/') && document.activeElement !== inputRef.current) {
        // Prevent typing 's' or '/' into the focused field immediately
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-100 mb-3">
      <InputGroup className="shadow-sm border rounded-3 overflow-hidden">
        <InputGroup.Text className="bg-white border-0 text-muted ps-3">
          <i className="bi bi-search"></i>
        </InputGroup.Text>
        <Form.Control
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title, description, or category... (Press '/' to focus)"
          className="border-0 bg-white py-2.5"
          style={{ fontSize: '0.9rem' }}
        />
        {searchQuery && (
          <Button 
            variant="white" 
            onClick={handleClear} 
            className="border-0 text-muted px-3"
            style={{ fontSize: '0.9rem' }}
          >
            <i className="bi bi-x-lg"></i>
          </Button>
        )}
      </InputGroup>
    </div>
  );
};

export default SearchBar;
