Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords'
  }

  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
  
  root to: 'companies#index'

  namespace :api, defaults: { format: 'json' } do
    namespace :company_search do
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
  resources :dcs do
    collection {post :import}
  end
end
