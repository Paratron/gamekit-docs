conf:{
    "key": "download",
    "title": "Download gamekit",
    "disqus": false,
    "modules": {
        "ContentNavigation": {
            "active": false
        }
    }
}:conf

#Download gamekit

Gamekit is an open source project ([hosted on github](https://github.com/paratron/gamekit)), licensed 
 under the Creative Common license ([Attribution-NonCommercial 4.0 Unported (CC BY-NC 4.0)](http://creativecommons.org/licenses/by-nc/4.0/)).
 
You can use gamekit for free in any non-commercial project, as long as you mention somewhere that
its made with gamekit.

If you want to use it commercially, please contact [hello@wearekiss.com](mailto:hello@wearekiss.com) and we can work out something fair for both you and us.
We don't want to get rich from this project, but since it makes a lot of work to create and maintain this thing... yeah, you know how it is.

<br>
<a href="https://github.com/Paratron/gamekit/tree/master/dist" class="downloadButton">Download the latest full gamekit release</a> <span class="light">( about 27kb )</span>



##Make your own build
Gamekit is very lightweight. But it may still include stuff that you don't need to build your next game.

Feel free to use our custom build (any minification) service to get the smallest possible gamekit
build for your needs!


<div class="moduleList">
{% for module in vars.modules %}
<div class="keeper">
    <div class="module" data-module="{{ module.key }}" data-dependencies="{{ module.dependencies|json_encode }}">
        {% if module.dependencies.length %}
            <i class="dependencies" title="{{ module.dependencies|join(', ') }}"></i>
        {% endif %}
        <b>{{ module.title }}</b>
        <p>{{ module.description }}</p>
        <label><input type="checkbox" {% if module.mandatory %}checked disabled{% endif %} data-index="{{ module.index }}"> Include this</label>
    </div>
</div>
{% endfor %}
<div class="keeper{% if vars.modules|length % 2 == 0 %} wideKeeper{% endif %}">
    <div class="follow">
        More build elements under development
    </div>
</div>
</div>

<a href="#" class="downloadButton makeBuild">Make and download your build now</a> <span class="light buildInfo"></span>

<script>
    window.totalModules = {{ vars.modules|length }};
</script>