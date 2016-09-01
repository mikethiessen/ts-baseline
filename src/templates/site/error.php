<?php
include( $_SERVER['DOCUMENT_ROOT'] . '/templates/site/_document-head.php' );
include( $_SERVER['DOCUMENT_ROOT'] . '/templates/site/_page-header.php' );
?>

    <main id="main" class="main" role="main" tabindex="-1">

        <div class="media has-margin container">

            <?php include( $_SERVER['DOCUMENT_ROOT'] . '/templates/site/_sidebar.php' ); ?>

            <article class="media-content">

                <h1 class="heading">404: Page Not Found</h1>
                <p>The page <mark>&ldquo;<?php echo $_SERVER['REQUEST_URI']; ?>&rdquo;</mark> may have been removed or renamed.</p>
                <p>Please check the URL for proper spelling and capitalization. Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium, architecto commodi consectetur dolor ea eos expedita facilis illo, in molestias natus pariatur provident quos saepe vel veniam vitae voluptas.</p>
            </article>
        </div>
    </main>

<?php include( $_SERVER['DOCUMENT_ROOT'] . '/templates/site/_page-footer.php' ); ?>