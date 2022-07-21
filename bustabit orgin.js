var isVerifying = false;
$('#game_verify_submit').on('click', () => {
  if (isVerifying) return;
  isVerifying = true;
  $('#game_hash_input').parent().addClass('is-loading');
  $('#game_verify_submit').addClass('is-loading');
  $('#game_hash_input, #game_amount_input, #game_verify_submit').attr('disabled', 'disabled');
  $('#game_verify_table').html('');

  let prevHash = null;
  for (let i = 0; i < $('#game_amount_input').val(); i++) {
    let hash = String(prevHash ? CryptoJS.SHA256(String(prevHash)) : $('#game_hash_input').val());
    let bust = gameResult(CryptoJS.enc.Hex.parse(hash), '0000000000000000004d6ec16dafe9d8370958664c1dc422f452892264c59526');

    setTimeout(function() {
      addTableRow(hash, bust, i);
    }, i * 1);

    prevHash = hash;
  }
});

$('#game_amount_input').on('keyup', () => {
  if ($('#game_amount_input').val() >= 10000) {
    if ($('#game_verify_warning').length) return;
    $('#game_verify_submit').parent().append(
      $('<span/>').attr({
        'id': 'game_verify_warning',
        'class': 'tag is-warning'
      }).text("Verifying a huge amount of games may consume more ressources from your CPU")
    );
  } else {
    if ($('#game_verify_warning').length) {
      $('#game_verify_warning').remove();
    }
  }
});

const addTableRow = (hash, bust, index) => {
  $('<tr/>').attr({
    'class': index === 0 ? 'is-first' : null
  }).append(
    $('<td/>').text(hash)
  ).append(
    $('<td/>').text(bust).attr({
      'class': bust === 1.98 ? 'is-at-median' : bust > 1.98 ? 'is-over-median' : 'is-under-median'
    })
  ).appendToWithIndex($('#game_verify_table'), index);

  if (index >= $('#game_amount_input').val() - 1) {
    $('#game_hash_input').parent().removeClass('is-loading');
    $('#game_verify_submit').removeClass('is-loading');
    $('#game_hash_input, #game_amount_input, #game_verify_submit').removeAttr("disabled");
    isVerifying = false;
  }
};

/**
  * @desc Calculates the game result from its hash
  * @param binary seed - Hash of the game. Ex.: Buffer.from(seed)
  * @param string salt - Client seed; A bitcoin block hash
  * @return number
*/
const gameResult = (seed, salt) => {
  const nBits = 52; // number of most significant bits to use

  // 1. HMAC_SHA256(message=seed, key=salt)
  const hmac = CryptoJS.HmacSHA256(seed, salt);
  seed = hmac.toString(CryptoJS.enc.Hex);

  // 2. r = 52 most significant bits
  seed = seed.slice(0, nBits / 4);
  const r = parseInt(seed, 16);

  // 3. X = r / 2^52
  let X = r / Math.pow(2, nBits); // uniformly distributed in [0; 1)

  // 4. X = 99 / (1-X)
  X = 99 / (1 - X);

  // 5. return max(trunc(X), 100)
  const result = Math.floor(X);
  return Math.max(1, result / 100);
};

$.fn.appendToWithIndex = function(to, index) {
  if (!to instanceof jQuery) {
    to = $(to);
  }
  if (index === 0) {
    $(this).prependTo(to);
  } else {
    $(this).insertAfter(to.children().eq(index - 1));
  }
};
