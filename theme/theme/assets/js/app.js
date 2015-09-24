(function($) {

    var $form = $('#form'),
        $id = $('#id'),
        $liquid = $('#liquid'),
        $css = $('#css'),
        $js = $('#js'),
        $template = $('#template'),
        $product = $('#product'),
        queryParameters = $.getQueryParameters();

    // On load, populate the ID input correctly.
    if('droplet' in queryParameters) {
        var dropletID = queryParameters['droplet'];
        $id.val(dropletID);
        $.getJSON('/apps/droplet/droplets/' + dropletID, function(droplet) {
            $liquid.val(droplet.liquid);
            $css.val(droplet.css);
            $js.val(droplet.js);
            $template.val(droplet.template);
            $product.val(droplet.product);
        });
    } else {
        $id.val(Math.random().toString(36).substring(6));
    }

    // Intercept the submit event to AJAXify our request.
    $form.submit(function(e) {
        e.preventDefault();
        $.post('/apps/droplet/droplets', $form.serialize(), function() {
            alert('done!');
        });
    });

}(jQuery));
