[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Ush3CdE7)
# Web 2 - Lab Day 2: User Profile

**Objective:** Create a web app that displays a user's info, their posts, and their todos using jQuery.

**Demo:** [https://drive.google.com/file/d/18ViKAz3Irnh4uaMwr65tK2fiKaFo1yaN/view?usp=sharing]

## Instructions

- Recreate the demo video provided. The HTML and CSS is already provided but you **CANNOT** modify the HTML. You are free to modify the CSS.
- Fetch the first user data by passing `1` to the users API endpoint: [https://dummyjson.com/users/1]
- Clicking on the **Previous** button will show the previous user by `id` while the **Next** button will show the next user. For example, the first user that will be diplayed has an id of `1`. Clicking the **Next** button will show user id `2` and so on. However, clicking on the **Previous** button will show user id `30` since you will only receive 30 users from the API.

  If the current user displayed is user id `30`, clicking the **Next** button will loop back to user id `1`.
- Clicking on the post title will open a modal with some post information *(title, body, views)*. The modal needs to be dynamically created in your JavaScript file. The modal should also have a *Close Modal* button.
- The Posts and To Dos `<h3>` headings are clickable and will slide the content up or down.
- Use jQuery methods and event listeners to complete the exercise. Use AJAX instead of `fetch`.

## API Endpoints

**Documentation:** [https://dummyjson.com/docs]

- Users by user id: [https://dummyjson.com/users/${userid}]
- Posts by user id: [https://dummyjson.com/users/${userid}/posts]
- Todos by user id: [https://dummyjson.com/users/${userid}/todos]
- Posts by post id (for the modal): [https://dummyjson.com/posts/${postid}]

## Tip

Focus on getting and displaying the data first before working on the modal. Create reusable functions where you can just pass the ids as parameters. Good luck!
