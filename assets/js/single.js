var issueContainer = document.querySelector('#issues-container');

function getRepoIssues(repo) {
  var apiUrl = 'https://api.github.com/repos/' + repo + '/issues?direction=asc';
  fetch(apiUrl).then(function (response) {
    //successful request
    if (response.ok) {
      response.json().then(function (data) {
        // pass response to dom function
        displayIssues(data);
      });
    } else {
      alert('There was a problem with your request!')
    }
  });
};

function displayIssues(issues) {
  // check if repo has any open issues
  if (issues.length === 0) {
    issueContainer.textContent = 'This repo has no open issues.';
    return;
  }
  // loop through data to display issues
  for (var i = 0; i < issues.length; i++) {
    // create link to issue on github
    var issueLink = document.createElement('a');
    issueLink.classList = 'list-item flex-row justify-space-between align-center';
    issueLink.setAttribute('href', issues[i].html_url);
    issueLink.setAttribute('target', '_blank');
    // create span for issue title
    var issueTitle = document.createElement('span');
    issueTitle.textContent = issues[i].title;
    issueLink.appendChild(issueTitle);
    // create type element
    var issueType = document.createElement('span');
    // check if actual issue or pull request
    if (issues[i].pull_request) {
      issueType.textContent = '(Pull request)';
    } else {
      issueType.textcontent = '(Issue)';
    }
    issueLink.appendChild(issueType);
    issueContainer.appendChild(issueLink);
  }
};

getRepoIssues("facebook/react");