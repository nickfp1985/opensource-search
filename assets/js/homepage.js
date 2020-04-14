var usernameForm = document.querySelector('#user-form');
var usernameInput = document.querySelector('#username');
var repoListContainer = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');

function formSubmitHandler(event) {
  event.preventDefault();
  // get value from Search By User
  var username = usernameInput.value.trim();
  // check there is a value
  if (username) {
    getUserRepos(username);
    usernameInput.value = '';
  } else {
    // if left blank
    alert('Please enter a Github username');
  }
  console.log(event);
};

function getUserRepos(user) {
  // format the github api url
  var apiUrl = 'https://api.github.com/users/' + user + '/repos';

  // make api request
  fetch(apiUrl).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
        alert('Unable to connect to Github');
        })
    };

  usernameForm.addEventListener('submit', formSubmitHandler);


  function displayRepos(repos, searchTerm) {
    // clear old content
    repoListContainer.textContent = '';
    repoSearchTerm.textContent = searchTerm;

    // check if api returned any repos
    if (repos.length === 0) {
      repoListContainer.textContent = 'No repositories found.';
      return;
    }

    // loop over repo data
    for (var i = 0; i < repos.length; i++) {
      // format repo name
      var formatRepoName = repos[i].owner.login + '/' + repos[i].name;
      // create container for each repo
      var repoContainer = document.createElement('div');
      repoContainer.classList = 'list-item flex-row justify-space-between align-center';
      // create a span element for repo name
      var repoName = document.createElement('span');
      repoName.textContent = formatRepoName;

      repoContainer.appendChild(repoName);

      // create status elements
      var repoStatus = document.createElement('span');
      repoStatus.classList = 'flex-row align-center';

      // check current repo for issues
      if (repos[i].open_issues_count > 0) {
        repoStatus.innerHTML = '<i class="fas fa-times status-icon icon-danger"></i>' + repos[i].open_issues_count + ' issue(s)';
      } else {
        repoStatus.innerHTML = '<i class="fas fa-check-square status-icon icon-success"></i>';
      }

      // append to container
      repoContainer.appendChild(repoStatus);
      // append container to DOM
      repoListContainer.appendChild(repoContainer);
    }
  };
