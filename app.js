$(async function() {
  let currentUserId = 1;
  const headerButtons = $('header button');

  await getUserPage(currentUserId);

  headerButtons.first().prop('disabled', true);
  headerButtons.first().addClass('no-hover')

  headerButtons.first().on('click', function(e) {
    if (currentUserId !== 1) {
      currentUserId -= 1;
      getUserPage(currentUserId)
    }
  })

  headerButtons.last().on('click', function(e) {
    currentUserId += 1;
    getUserPage(currentUserId)
  })

  $('.posts').on('click', function(e) {
    $(this).find('ul').slideToggle()
  })

  $('.todos').on('click', function(e) {
    $(this).find('ul').slideToggle()
  })
})

async function getUserPage(userId) {
  const infoImage = $('.info__image')
  const infoContent = $('.info__content')
  const postTitle = $('.posts > h3')
  const posts = $('.posts > ul')
  const todoTitle = $('.todos > h3')
  const todos = $('.todos > ul')
  const headerButtons = $('header button');
  const container = $('main')

  container.fadeOut(100);
  const user = await getUser(1, userId - 1)

  if (user.hasPrev) {
    headerButtons.first().prop('disabled', false);
    headerButtons.first().removeClass('no-hover')
  } else {
    headerButtons.first().prop('disabled', true);
    headerButtons.first().addClass('no-hover')
  }

  if (user.hasNext) {
    headerButtons.last().prop('disabled', false);
    headerButtons.last().removeClass('no-hover')
  } else {
    headerButtons.last().prop('disabled', true);
    headerButtons.last().addClass('no-hover')
  }

  const img = document.createElement('img');
  img.src = user.user.image;
  infoImage.empty()
  infoImage.append(img);

  let contentHTML = `
    <h2>${user.user.firstName} ${user.user.lastName}</h2>
    <p><strong>Age: </strong>${user.user.age}</p>
    <p><strong>Email: </strong>${user.user.email}</p>
    <p><strong>Phone: </strong>${user.user.phone}</p>`

  infoContent.html(contentHTML)

  const userPosts = await getUserPostsById(user.user.id);
  postTitle.html(`${user.user.firstName}'s Posts`);
  let postsInnerHTML = '<li>User has no posts</li>';
  userPosts.forEach(post => {
    postsInnerHTML = '';
    postsInnerHTML += `<li>
        <h4 class="post-title" data-post-id="${post.id}">${post.title}</h4>
        <p>${post.body}</p>
    </li>`
  })
  posts.html(postsInnerHTML)

  const userTodos = await getUserTodosById(user.user.id)
  todoTitle.html(`${user.user.firstName}'s Todos`);
  let todosInnerHTML = '<li>User has no todos</li>';
  userTodos.forEach(userTodo => {
    todosInnerHTML = '';
    todosInnerHTML += `<li>${userTodo.todo}</li>`
  })
  todos.html(todosInnerHTML)

  container.fadeIn('slow');

  $('.post-title').on('click', async function(e) {
    const postId = $(this).data('postId');
    const post = await getPostById(postId)

    const dialogHTML = `<dialog id="modal-post-${post.id}" class="modal">
      <h2>${post.title}</h2>
      <p>${post.body}</p>
      <p><em>Views: ${post.views}</em></p>
      <button id="closeModal">Close Modal</button>
    </dialog>`

    $('.container').append(dialogHTML)

    document.querySelector(`#modal-post-${post.id}`).showModal();

    $('#closeModal').on('click', function(e) {
      document.querySelector(`#modal-post-${post.id}`).remove()
    })
  })
}

async function getUser(limit, skip= 0) {
  let returnData = {};

  await $.ajax({
    url: `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
    type: 'GET',
    success: function(data) {
      const user = data.users[0];

      returnData = {
        user: user,
        hasPrev: user.id !== 1,
        hasNext: user.id < data.total,
      }
    },
    error: function(error) {
      console.log(error)
    }
  })

  return returnData;
}

async function getUserInfoById(id) {
  await $.ajax({
    url: `https://dummyjson.com/users/${id}`,
    type: 'GET',
    success: function(data) {
      console.log(data)
    },
    error: function(error) {
      console.log(error)
    }
  })
}

async function getUserPostsById(id) {
  let posts = [];

  await $.ajax({
    url: `https://dummyjson.com/users/${id}/posts`,
    type: 'GET',
    success: function(data) {
      posts = data.posts;
    },
    error: function(error) {
      console.log(error)
    }
  })

  return posts;
}

async function getPostById(postId) {
  let post = {};

  await $.ajax({
    url: `https://dummyjson.com/posts/${postId}`,
    type: 'GET',
    success: function(data) {
      post = data;
    },
    error: function(error) {
      console.log(error)
    }
  })

  return post;
}

async function getUserTodosById(id) {
  let todos = [];

  await $.ajax({
    url: `https://dummyjson.com/users/${id}/todos`,
    type: 'GET',
    success: function(data) {
      todos = data.todos;
    },
    error: function(error) {
      console.log(error)
    }
  })

  return todos;
}