Rails.application.routes.draw do
  resources :columns do
    resources :tasks, only: [:create, :update, :destroy]
  end
end