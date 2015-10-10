require 'openssl'
require 'rack/utils'

class ApplicationController < ActionController::Base
  include ShopifyApp::Controller
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session 


protected
  # based off https://docs.shopify.com/api/uiintegrations/application-proxies#security
  def verified_request?
    Rails.env.development? || check_signature
  end

  def check_signature
    query_hash = Rack::Utils.parse_query(request.query_string)
    signature = query_hash.delete("signature")
    sorted_params = query_hash.collect{ |k, v| "#{k}=#{Array(v).join(',')}" }.sort.join
    calculated_signature = OpenSSL::HMAC.hexdigest(OpenSSL::Digest.new('sha256'), ENV['SHOPIFY_APP_SECRET'], sorted_params)
    signature == calculated_signature
  end


end
