import React, { useState, useEffect } from 'react';
import './PageAnalyzer.css';

const PageAnalyzer = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [elementInfo, setElementInfo] = useState(null);

  useEffect(() => {
    const handleBodyClick = (event) => {
      if (!isActive) return;
      event.preventDefault();
      selectElement(event.target);
    };

    const selectElement = (element) => {
      if (selectedElement) {
        selectedElement.classList.remove('highlight');
      }
      element.classList.add('highlight');
      setSelectedElement(element);
      analyzeElement(element);
    };

    const analyzeElement = (element) => {
      const tagName = element.tagName;
      const classList = Array.from(element.classList);
      const textContent = element.textContent;
      const href = element.getAttribute('href') || 'N/A';

      setElementInfo({
        tagName,
        classList,
        textContent,
        href,
      });
    };

    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [isActive, selectedElement]);

  const toggleMode = () => {
    setIsActive(!isActive);
    if (!isActive && selectedElement) {
      selectedElement.classList.remove('highlight');
      setSelectedElement(null);
      setElementInfo(null);
    }
  };

  return (
    <div>
      <div
        className={`analyzer-toggle ${isActive ? 'active' : ''}`}
        onClick={toggleMode}
      >
        🔍
      </div>
      {elementInfo && (
        <div className="overlay">
          <strong>Tag Name:</strong> {elementInfo.tagName}<br />
          <strong>Classes:</strong> {elementInfo.classList.join(', ')}<br />
          <strong>Text Content:</strong> {elementInfo.textContent}<br />
          <strong>Href:</strong> {elementInfo.href}
        </div>
      )}
    </div>
  );
};

export default PageAnalyzer;
