class ApplicationController < ActionController::Base
  def access_public
    render file: "public/#{params[:page]}.html"
  end
end
