function formatDate() {
  let date = new Date();
  date = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

  date = date.split('-');

  const nDate = date.map((elem) => {
    if (elem.length === 1) {
      elem = '0' + elem;
    }
    return elem;
  });

  return nDate.join('-');
}

export default formatDate;
