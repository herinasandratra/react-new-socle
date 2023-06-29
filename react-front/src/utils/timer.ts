import moment from 'moment';

const getTimeAgo = (timestamp:string) => {
  const now = moment();
  const time = moment(timestamp);
  const diffInSeconds = now.diff(time, 'seconds');

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} minutes ago`;
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    return `${diffInHours} hours ago`;
  } else if (diffInSeconds < 2592000) { // Less than 30 days
    const diffInDays = Math.floor(diffInSeconds / 86400);
    return `${diffInDays} days ago`;
  } else if (diffInSeconds < 31536000) { // Less than 1 year
    const diffInMonths = Math.floor(diffInSeconds / 2592000);
    return `${diffInMonths} months ago`;
  } else {
    const diffInYears = Math.floor(diffInSeconds / 31536000);
    return `${diffInYears} years ago`;
  }
};

export default getTimeAgo;

