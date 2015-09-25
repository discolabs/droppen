(function($) {

    var $editor = $('#editor'),
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

    // On load, initialise CodeMirrors
    var jsCodeMirror = CodeMirror.fromTextArea($js.get(0), {
        mode: 'javascript'
    });
    var cssCodeMirror = CodeMirror.fromTextArea($css.get(0), {
        mode: 'css'
    });
    var liquidCodeMirror = CodeMirror.fromTextArea($liquid.get(0), {
        mode: 'html'
    });

    // Intercept the submit event to AJAXify our request.
    $editor.submit(function(e) {
        e.preventDefault();
        $.post('/apps/droplet/droplets', $editor.serialize(), function() {
            alert('done!');
        });
    });

}(jQuery));
