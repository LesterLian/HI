Rails.application.routes.draw do
  resources :items
  resources :storages
  resources :tags
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'index#index'
  get '/public/:page' => 'application#access_public'
  scope "(:locale)", locale: /#{I18n.available_locales.join("|")}/ do
    get '/' => 'index#index'
    resources :items
    resources :storages
    resources :tags
  end
end
