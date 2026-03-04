(function() {
  'use strict';
  var postsPerPage = 6;
  var posts = document.querySelectorAll('.post-card');
  var totalPosts = posts.length;
  var visiblePosts = postsPerPage;

  // Initially hide posts beyond the limit
  for (var i = postsPerPage; i < totalPosts; i++) {
    posts[i].style.display = 'none';
  }

  // Create Load More button if needed
  if (totalPosts > postsPerPage) {
    var loadMoreContainer = document.createElement('div');
    loadMoreContainer.className = 'blog-load-more';

    var loadMoreBtn = document.createElement('button');
    loadMoreBtn.className = 'btn btn-outline';
    loadMoreBtn.textContent = 'Load More';

    loadMoreContainer.appendChild(loadMoreBtn);

    // Append to blog-posts container
    var blogPostsContainer = document.querySelector('.blog-posts');
    if (blogPostsContainer) {
      blogPostsContainer.parentNode.insertBefore(loadMoreContainer, blogPostsContainer.nextSibling);
    }

    loadMoreBtn.addEventListener('click', function() {
      var nextPosts = visiblePosts + postsPerPage;
      for (var i = visiblePosts; i < nextPosts && i < totalPosts; i++) {
        posts[i].style.display = 'block';
      }
      visiblePosts = nextPosts;

      if (visiblePosts >= totalPosts) {
        loadMoreContainer.style.display = 'none';
      }
    });
  }
})();
