const Message = ({ message, type }) => {
    if (message === null) {
      return null; // Don't render anything if there's no message
    }
  
    // Determine the CSS class based on the notification type
    const messageClass = type === 'error' ? 'error' : 'success';
  
    return (
      <div className={`message ${messageClass}`}> {/* Use template literal for classes */}
        {message}
      </div>
    );
  };
  
  export default Message;