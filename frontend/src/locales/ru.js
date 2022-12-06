export default {
  translation: {
    errors: {
      requiredField: 'Обязательное поле',
      minMaxLength: 'От 3 до 20 символов',
      minPasswordLength: 'Не менее 6 символов',
      passwordsMustMatch: 'Пароли должны совпадать',
      personAlreadyExists: 'Такой пользователь уже существует',
      wrongCredentials: 'Неверные имя пользователя или пароль',
      notUnique: 'Должно быть уникальным',
    },
    signUpForm: {
      title: 'Регистрация',
      button: 'Зарегистрироваться',
      labels: {
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
      },
    },
    loginPage: {
      dontHaveAccount: 'Нет аккаунта?',
      signUp: 'Регистрация',
      form: {
        title: 'Войти',
        button: 'Войти',
        labels: {
          username: 'Ваш ник',
          password: 'Пароль',
        },
      },
    },
    chatPage: {
      channelBox: {
        title: 'Каналы',
        channelManagment: 'Управление каналом',
        remove: 'Удалить',
        rename: 'Переименовать',
      },
      messageBox: {
        messages: ' сообщений',
      },
      form: {
        enterMessage: 'Введите сообщение...',
        button: 'Отправить',
      },
    },
    authButton: {
      logIn: 'Войти',
      logOut: 'Выйти',
    },
    notFoundPage: {
      title: 'Страница не найдена',
      text: 'Но вы можете перейти ',
      link: 'на главную страницу',
    },
    modals: {
      rename: {
        title: 'Переименовать канал',
        label: 'Имя канала',
        closeButton: 'Отменить',
        submitButton: 'Отправить',
      },
      remove: {
        title: 'Удалить канал',
        text: 'Уверены?',
        closeButton: 'Отменить',
        submitButton: 'Удалить',
      },
      add: {
        title: 'Добавить канал',
        label: 'Имя канала',
        closeButton: 'Отменить',
        submitButton: 'Отправить',
      },
    },
    toasts: {
      rename: 'Канал переименован',
      remove: 'Канал удален',
      add: 'Канал создан',
    },
  },
};
