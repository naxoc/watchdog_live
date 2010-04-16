<?php
// $Id: watchdog-live-popup.tpl.php,v 1.2 2009/11/04 20:19:36 naxoc Exp $
/**
 * @file
 * page.tpl.php
 * Template for a very basic popup page.
 */
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="<?php print $language->language ?>" lang="<?php print $language->language ?>" dir="<?php print $language->dir ?>">

<head>
  <?php print $head; ?>
  <title><?php print $head_title; ?></title>
  <?php print $styles; ?>
  <?php print $scripts; ?>
</head>
<body>
  <div id="page">
    <div id="content">
      <?php if (!empty($title)): ?><h1 class="title" id="page-title"><?php print $title; ?></h1><?php endif; ?>
      <?php if (!empty($messages)): print $messages; endif; ?>
      <div id="content-content" class="clear-block">
        <?php print $content; ?>
      </div> <!-- /content-content -->
    </div> <!-- /content -->

    <?php print $closure; ?>

  </div> <!-- /page -->
</body>
</html>
