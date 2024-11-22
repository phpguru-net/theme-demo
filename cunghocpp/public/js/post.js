document.addEventListener("DOMContentLoaded", () => {
  const tocList = document.getElementById("toc-list");
  const tocWrapper = document.querySelector(".toc-wrapper");
  const tocToggle = document.getElementById("toc-toggle");
  const postContent = document.getElementById("post-content");

  // Generate TOC dynamically
  const headings = postContent.querySelectorAll("h1, h2, h3, h4, h5, h6");
  if (headings.length > 0) {
    headings.forEach((heading, index) => {
      const id = `heading-${index}`;
      heading.setAttribute("id", id);

      const level = parseInt(heading.tagName.replace("H", ""), 10); // Extract level from heading tag

      const listItem = document.createElement("li");
      listItem.setAttribute("data-level", level); // Add data-level attribute for styling
      listItem.innerHTML = `
          <a href="#${id}" class="text-primary-color hover:underline">${heading.textContent}</a>
        `;

      tocList.appendChild(listItem);
    });
  } else {
    tocToggle.style.display = "none"; // Hide TOC toggle if no headings are found
  }

  // Initialize TOC display state
  let isTocVisible = true; // Assume TOC is visible by default

  // Enable smooth scrolling on TOC click
  tocList.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault(); // Prevent default anchor behavior
      const targetId = e.target.getAttribute("href").substring(1); // Get ID without #
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" }); // Smooth scroll
      }
    }
  });

  // TOC toggle functionality
  tocToggle.addEventListener("click", () => {
    if (isTocVisible) {
      tocWrapper.style.display = "none"; // Hide TOC
      tocToggle.innerHTML = `<i class="fa-solid fa-list"></i>`;
    } else {
      tocWrapper.style.display = "block"; // Show TOC
      tocToggle.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    }
    isTocVisible = !isTocVisible; // Toggle state
  });

  // Highlight active TOC item on scroll
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY + 100; // Adjust offset for active detection
    headings.forEach((heading, index) => {
      const link = tocList.querySelector(`a[href="#heading-${index}"]`);
      if (
        heading.offsetTop <= scrollPosition &&
        heading.offsetTop + heading.offsetHeight > scrollPosition
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });

  const commentsList = document.getElementById("comments-list");
  const commentTextarea = document.getElementById("comment-textarea");
  const submitCommentButton = document.getElementById("submit-comment");

  // Add a new comment
  submitCommentButton.addEventListener("click", () => {
    const commentText = commentTextarea.value.trim();
    if (commentText) {
      const newComment = document.createElement("li");
      newComment.className = "comment-item bg-white p-4 rounded-lg shadow";
      newComment.innerHTML = `
        <div class="flex items-start space-x-4">
          <img src="/path/to/avatar.jpg" alt="Avatar" class="w-10 h-10 rounded-full">
          <div>
            <p class="font-medium text-gray-700">Anonymous</p>
            <p class="text-sm text-gray-500">Posted on: ${new Date().toLocaleDateString()}</p>
            <p class="mt-2 text-gray-800">${commentText}</p>
            <button class="mt-2 text-sm text-primary hover:underline reply-btn">Reply</button>
          </div>
        </div>
        <div class="reply-form mt-4 hidden">
          <textarea rows="2" placeholder="Write your reply..." class="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-primary-color"></textarea>
          <button class="mt-2 px-4 py-1 bg-primary-color text-white rounded-lg hover:bg-primary-color-hover">Submit Reply</button>
        </div>
      `;
      commentsList.appendChild(newComment);
      commentTextarea.value = "";
    }
  });

  // Handle reply button clicks
  commentsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("reply-btn")) {
      const replyForm = e.target
        .closest(".comment-item")
        .querySelector(".reply-form");
      replyForm.classList.toggle("hidden");
    }
  });
});
