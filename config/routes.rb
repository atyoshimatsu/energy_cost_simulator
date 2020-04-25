Rails.application.routes.draw do
  root to: 'companies#index'
  namespace :api, defaults: { format: 'json' } do
    namespace :sidebar_company_search do
      resources :companies, only: :index
    end
    namespace :maintop_company_search do
      resources :companies, only: :index
    end
    namespace :menu_search do
      resources :menues, only: :index
    end
  end

  resources :companies, only: [:index] do
    collection {post :import}
  end
  resources :menues do
    collection {post :import}
  end
end
