ruby '2.2.2'
source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.3'

gem 'pg', '~> 0.18.2'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Unicorn as the app server
# gem 'unicorn'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end

gem 'disco_app', git: 'https://disco-gems:0dfbd458c126baa2744cef477b24c7cf7227fae5@github.com/discolabs/disco_app.git', tag: '0.5.5'

gem 'shopify_app', '~> 6.1.0'
gem 'sidekiq', '~> 3.5.0'
gem 'puma', '~> 2.11.3'
gem 'bootstrap-sass', '~> 3.3.5.1'
group :development, :test do
  gem 'dotenv-rails', '~> 2.0.2'
  gem 'minitest-reporters', '~> 1.0.19'
  gem 'guard', '~> 2.13.0'
  gem 'guard-minitest', '~> 2.4.4'
  gem 'mocha', '~> 1.1.0'
  gem 'pry-byebug'
end

group :production do
  gem 'rails_12factor', '~> 0.0.3'
end
