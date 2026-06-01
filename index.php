<?php
$assetDir = __DIR__ . '/assets';
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
$message = '';

if (!is_dir($assetDir)) {
    mkdir($assetDir, 0755, true);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_FILES['photos'])) {
    foreach ($_FILES['photos']['name'] as $index => $name) {
        $tmpName = $_FILES['photos']['tmp_name'][$index];
        $error = $_FILES['photos']['error'][$index];
        if ($error !== UPLOAD_ERR_OK || !is_uploaded_file($tmpName)) {
            continue;
        }

        $extension = strtolower(pathinfo($name, PATHINFO_EXTENSION));
        if (!in_array($extension, $allowedExtensions, true)) {
            continue;
        }

        $safeName = preg_replace('/[^A-Za-z0-9._-]/', '_', basename($name));
        $targetName = sprintf('%s-%s', uniqid('img_', true), $safeName);
        $targetPath = $assetDir . '/' . $targetName;

        if (!move_uploaded_file($tmpName, $targetPath)) {
            $message = 'Some files could not be saved. Please try again.';
        }
    }

    if ($message === '') {
        $message = 'Your photos were added successfully.';
    }
}

$images = [];
foreach (scandir($assetDir, SCANDIR_SORT_ASCENDING) as $item) {
    $path = $assetDir . '/' . $item;
    if (!is_file($path)) {
        continue;
    }

    $extension = strtolower(pathinfo($item, PATHINFO_EXTENSION));
    if (in_array($extension, $allowedExtensions, true)) {
        $images[] = $item;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dreamy Mini Album</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="page-shell">
    <header class="hero">
      <div class="hero-decor"></div>
      <div class="hero-content">
        <span class="eyebrow">Photo Diary</span>
        <h1>Dreamy Mini Album</h1>
        <p>These photos come from your <strong>assets</strong> folder. Add new images below and they will appear in the album automatically.</p>

        <form id="uploadForm" class="upload-area" action="" method="post" enctype="multipart/form-data">
          <label class="upload-button" for="photoInput">
            Add Photos
          </label>
          <input id="photoInput" name="photos[]" type="file" accept="image/*" multiple>
          <p class="upload-hint">Drag & drop photos here or click the button to choose files.</p>
          <?php if ($message): ?>
            <div class="upload-message"><?= htmlspecialchars($message, ENT_QUOTES) ?></div>
          <?php endif; ?>
        </form>
      </div>
    </header>

    <main>
      <section class="gallery-section">
        <div class="gallery-header">
          <div>
            <h2>Your Album</h2>
            <p>All photos are loaded from the <code>assets</code> folder, and uploads are saved there too.</p>
          </div>
        </div>

        <div class="gallery-grid" id="gallery">
          <?php if (empty($images)): ?>
            <p class="empty-state" id="emptyState">No photos yet. Add your first image to start the album.</p>
          <?php else: ?>
            <?php foreach ($images as $image): ?>
              <?php $url = 'assets/' . rawurlencode($image); ?>
              <div class="card" data-name="<?= htmlspecialchars($image, ENT_QUOTES) ?>" data-src="<?= htmlspecialchars($url, ENT_QUOTES) ?>">
                <div class="card-top"></div>
                <img src="<?= $url ?>" alt="<?= htmlspecialchars($image, ENT_QUOTES) ?>">
              </div>
            <?php endforeach; ?>
          <?php endif; ?>
        </div>
      </section>
    </main>

    <footer>
      <p>ICT-CSS Batch 2023-2024</p>
    </footer>

    <div class="lightbox" id="lightbox" aria-hidden="true">
      <button class="close-lightbox" id="lightboxClose" aria-label="Close preview">×</button>
      <img id="lightboxImage" src="" alt="Preview image">
      <p id="lightboxCaption"></p>
    </div>
  </div>

  <script src="script.js"></script>
</body>
</html>
