require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module DropletApp
  class Application < Rails::Application
    config.action_dispatch.default_headers['P3P'] = 'CP="Not used"'
    config.action_dispatch.default_headers.delete('X-Frame-Options')
    # Set the name of the application
    config.x.shopify_app_name = ENV['SHOPIFY_APP_NAME']

    # Set the default host for absolute URL routing purposes
    routes.default_url_options[:host] = ENV['DEFAULT_HOST']

    # Explicitly prevent real charges being created by default
    config.x.shopify_charges_real = false

    # Set defaults for charges created by the application
    config.x.shopify_charges_default_type = :recurring
    config.x.shopify_charges_default_price = 10.00
    config.x.shopify_charges_default_trial_days = 14

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # Do not swallow errors in after_commit/after_rollback callbacks.
    config.active_record.raise_in_transactional_callbacks = true
  end
end
