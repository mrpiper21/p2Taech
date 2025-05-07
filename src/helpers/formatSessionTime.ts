const formatSessionTime = (dateString: string, timeString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    return new Date(`${dateString}T${timeString}`).toLocaleTimeString('en-US', options);
  };

  export default formatSessionTime