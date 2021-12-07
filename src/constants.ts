export enum Routes {
  Login = '/login',
  Users = '/items',
  Wrong = '/items/wrong',
  Reused = '/items/reused',
  Old = '/items/old',
  Root = '/',
}

export enum API {
  Login = 'api/login',
  Logout = 'api/logout',
  Items = 'api/items',
  User = 'api/user',
}

export enum FILTER_OPTIONS {
  WRONG = 'wrong',
  REUSED = 'reused',
  OLD = 'old',
  ALL = 'all',
}
