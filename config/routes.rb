Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "pages#home"
  
  # get "show" ,to: "pages#show"
  
  resources :courses do
    resources :holes
  end
  # resources :annotations
  resources :userinfos
  # resources :users
end
