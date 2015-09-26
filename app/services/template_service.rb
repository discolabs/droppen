class TemplateService

  attr_reader :droplet

  def initialize(droplet)
    @droplet = droplet
  end

  def push
    asset = ShopifyAPI::Asset.new('key': template_name, 'value': template_code)

    Shop.first.temp {
      asset.save
    }

  end

  private

  def template_name
    "templates/#{@droplet.template}.#{@droplet.code}.liquid"
  end

  def template_code
    %{
      {% layout 'none' %} 

      {% comment %} 
      Start of CSS 
      {% endcomment %}
      <style>
      #{@droplet.css}
      </style>
      {% comment %} 
      End of CSS 
      {% endcomment %}
      
      {% comment %} 
      Start of Liquid 
      {% endcomment %}
      #{@droplet.liquid}
      {% comment %} 
      End of Liquid 
      {% endcomment %}

      {% comment %} 
      Start of Javascript 
      {% endcomment %}
      <script type="text/javascript">
      #{@droplet.js}
      </script>
      {% comment %} 
      End of Javascript 
      {% endcomment %}
    } 
  end
end
