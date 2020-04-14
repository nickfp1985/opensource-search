function getUserRepos(user) {
  // format the api url
  var apiUrl = 'https://api.github.com/users/' + user + '/repos';

  // make api request
  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
    })
  })
};

getUserRepos('nickfp1985');