window.onload = () => {
  const checks = $('.amenities input');
  const selElem = $('.amenities > h4');
  const amList = [];

  $(checks).on('change', function () {
    const amName = $(this).attr('data-name');
    const amId = $(this).attr('data-id');
    if (this.checked) {
      amList[amId] = amName;
    } else {
      delete amList[amId];
    }

    // console.log(amList);

    let selItems = '';
    let i = 0;
    for (const id in amList) {
      const name = amList[id];

      if (i > 0 || i < amList.length - 1) {
        selItems += ', ';
      }
      selItems += name;

      i++;
    }

    // console.log(selItems);

    selElem.html(selItems);
  });
};
