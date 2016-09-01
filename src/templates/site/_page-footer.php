    <hr />

    <footer class="page-footer" role="contentinfo">

        <div class="container">

            <p>&copy; Copyright <?php echo date( 'Y' ); ?></p>
        </div>
    </footer>

    <!-- Google Analytics: update site_id value to enable analytics -->
    <script>
        var site_id = 'UA-XXXXX-Y';
        if (site_id !== 'UA-XXXXX-Y') {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        ga('create', site_id, 'auto');
        ga('send', 'pageview');
        } else { throw new Error('Define site_id to enable Google Analytics.'); }
    </script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="/scripts/libs/jquery-1.12.0.min.js"><\/script>')</script>

    <script src="/scripts/plugins.js?v=<?php echo filemtime( $_SERVER['DOCUMENT_ROOT'] . '/scripts/plugins.js' ); ?>"></script>
    <script src="/scripts/main.js?v=<?php echo filemtime( $_SERVER['DOCUMENT_ROOT'] . '/scripts/main.js' ); ?>"></script>
</body>
</html>
