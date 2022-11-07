<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'intern-php' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'rk}+bOWSOpBz{3So~0zo0nT{yFrB6$`Ls% BuD-fJeASX! N]2wNyQw,.nrLS@$`' );
define( 'SECURE_AUTH_KEY',  'W=x!`.Qv,#;[){I-Yu2M:ZyghzHH&^6jjm2y<>Z3@[LbD[h7:JMRW.qxcH2II0::' );
define( 'LOGGED_IN_KEY',    'W?IdDo|]::uHRy%WXJN`?_(q8yVcm#B#f.*}v{g=-Rt&m^8/[onhGbK~FVPg? f ' );
define( 'NONCE_KEY',        '0Ue|noW8tI|z h@w11[ k.@80)47Opqu@TRq28;kD4.JI(ouUC >la{NE;m?8z;n' );
define( 'AUTH_SALT',        ')Y|+l,>=~oN:jpy}U L4W*3g^KtzdR~k3h@(Tlt6y0{j uTY:%+oL4DbBU*;* Y<' );
define( 'SECURE_AUTH_SALT', ']/r:M5mAXSTtZ]E`{*(g_P]MdoccZMv|ZBU;`^)<K=.SM+U*2>sM3T/`p.W3p&#i' );
define( 'LOGGED_IN_SALT',   'E6fl?L*=bH^JmZQtZSyM#)aA7Rl:x[eyF`w1o(xQVzMQNL4>R?]]l`7#/l=ZBnp6' );
define( 'NONCE_SALT',       'gnYx},1Zuh$T8?n:jR7I9I&&%yII+S4a #Y7g%qZm{bhyZ1^ MyxFj~kV%]6umV,' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
