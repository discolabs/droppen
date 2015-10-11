class TemplateService

  attr_reader :droppen

  def initialize(droppen)
    @droppen = droppen
  end

  def push(domain)
    asset = ShopifyAPI::Asset.new('key': template_name, 'value': template_code)

    shop = Shop.find_by(shopify_domain: domain)
    shop.temp {
      asset.save
    }

  end

  private

  def template_name
    "templates/#{@droppen.template}.#{@droppen.code}.liquid"
  end

  def template_code
    %{
      {% layout none %}

      {% comment %} 
      Start of CSS 
      {% endcomment %}
      <style>
      #{@droppen.css}
      </style>
      {% comment %} 
      End of CSS 
      {% endcomment %}
      
      {% comment %} 
      Start of Liquid 
      {% endcomment %}
      #{@droppen.liquid}
      {% comment %} 
      End of Liquid 
      {% endcomment %}

      {% comment %} 
      Start of Javascript 
      {% endcomment %}
      <script type="text/javascript">
      #{@droppen.js}
      </script>
      {% comment %} 
      End of Javascript 
      {% endcomment %}
    } 
  end
end
