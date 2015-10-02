/**
 * app.js
 * Application-specific code for the DropPen code editor.
 */
var DropPen = (function($) {

    // Declare variables local to the DropPen module.
    var DropPen = {},
        $editor, $code, $liquid, $css, $js, $preview, $template, $product, $productFormGroup,
        jsCodeMirror, cssCodeMirror, liquidCodeMirror,
        dropletCode, queryParameters;

    /***************************
     * Initialisation and setup.
     ***************************/

    /**
     * Initialise DropPen.
     */
    function init() {
        setupElementReferences();
        setupDropletCode();
        setupCodeMirrors();
        setupEventHandlers();
    }

    /**
     * Create jQuery references to various important DOM elements on the page.
     */
    function setupElementReferences() {
        $editor = $('#editor');
        $code = $('#code');
        $liquid = $('#liquid');
        $css = $('#css');
        $js = $('#js');
        $preview = $('#preview');
        $template = $('#template');
        $product = $('#product');
        $productFormGroup = $('#product-form-group');
    }

    /**
     * Ensure we have a Droplet code for this "session", based on the query
     * parameters. If no Droplet code is available, create a random one.
     */
    function setupDropletCode() {
        queryParameters = $.getQueryParameters();

        // Try to fetch the droplet code from the query parameters.
        if('droplet' in queryParameters) {
            dropletCode = queryParameters['droplet'];
        }

        // If we still don't have a valid droplet code, generate a random one.
        if(!dropletCode) {
            dropletCode = Math.random().toString(36).substring(6);
        }

        // Store the Droplet code in the form element.
        $code.val(dropletCode);
    }

    /**
     * Initialise CodeMirror on <textarea> elements.
     */
    function setupCodeMirrors() {
        jsCodeMirror = CodeMirror.fromTextArea($js.get(0), {
            mode: 'javascript',
            lineNumbers: true
        });
        cssCodeMirror = CodeMirror.fromTextArea($css.get(0), {
            mode: 'css',
            lineNumbers: true
        });
        liquidCodeMirror = CodeMirror.fromTextArea($liquid.get(0), {
            mode: 'html',
            lineNumbers: true
        });
    }

    /**
     * Register event handlers.
     */
    function setupEventHandlers() {
        $editor.on('submit', formSubmitted);
        $template.on('change', templateChanged);
        $preview.on('load', previewLoaded);
    }

    /******************
     * General methods.
     ******************/

    /**
     * Load the current droplet via an Ajax GET request.
     */
    function loadDroplet() {
        $.getJSON('/apps/droppen/droplets/' + dropletCode, function(droplet) {
            $liquid.val(droplet.liquid);
            $css.val(droplet.css);
            $js.val(droplet.js);
            $template.val(droplet.template);
            $product.val(droplet.product);
        });
    }

    /**
     * Save the current Droplet via an Ajax POST request.
     */
    function saveDroplet() {
        previewLoadingStarted();
        $.post('/apps/droppen/droplets', $editor.serialize(), function(droplet) {
            var previewUrlPath = {
                'index': '',
                'collection': 'collection/all/',
                'product': 'products/' + droplet.product
            };

            // Update the source of the preview iframe.
            $preview.attr('src', window.location.href + previewUrlPath[droplet.template] + '?view=' + droplet.code);
        });
    }

    /*****************
     * Event handlers.
     *****************/

    /**
     * Event handler for when the DropPen form is submitted (ie, the "Run"
     * button is clicked).
     *
     * @param e
     */
    function formSubmitted(e) {
        e.preventDefault();
        saveDroplet();
    }

    /**
     * Event handler for when the "Template" select dropdown changes.
     *
     * @param e
     */
    function templateChanged(e) {
        if($template.val() === 'product') {
            $productFormGroup.show().attr('disabled', null);
        } else {
            $productFormGroup.hide().attr('disabled', 'disabled');
        }
    }

    function previewLoadingStarted() {
        console.log('Preview loading...');
    }

    function previewLoaded() {
        console.log('Preview loaded.');
    }

    // Export public methods and the module.
    DropPen.init = init;
    return DropPen;

}(jQuery));
