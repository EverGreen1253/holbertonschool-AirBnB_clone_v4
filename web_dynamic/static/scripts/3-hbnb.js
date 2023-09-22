window.onload = () => {
  displaySelectedAmenities();

  $.ajax({
    url: 'http://localhost:5001/api/v1/places_search',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      createArticles(data);
    }
  });
};

function displaySelectedAmenities() {
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
}

function createArticles (data) {
  const places = $('section.places');

  let i = 0;
  for (const place of data) {
    // console.log(place);

    const guestPlural = place.max_guest !== 1 ? 's' : '';
    const bedroomPlural = place.number_rooms !== 1 ? 's' : '';
    const bathroomPlural = place.number_bathrooms !== 1 ? 's' : '';

    places.append('<article>\
      <div class="title_box">\
        <h2>' + place.name + '</h2>\
        <div class="price_by_night">$' + place.price_by_night + '</div>\
      </div>\
      <div class="information">\
        <div class="max_guest">' + place.max_guest + ' Guest' + guestPlural + '</div>\
          <div class="number_rooms">' + place.number_rooms + ' Bedroom' + bedroomPlural + '</div>\
          <div class="number_bathrooms">' + place.number_bathrooms + ' Bathroom' + bathroomPlural + '</div>\
        </div>\
      <div class="description">' + place.description + '</div>\
    </article>');
  }
}
