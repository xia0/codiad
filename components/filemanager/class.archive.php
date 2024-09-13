<?php

class Archive {
	
	const COMMANDS = array(
		
		"zip" => array(
			"compress" => array(
				"windows" => "",
				"linux" => "zip -r9 %output% %input%",
			),
			"decompress" => array(
				"windows" => "",
				"linux" => "unzip %input%",
			),
		),
	);
	
	const EXTENSIONS = array(
		
		"zip" => "zip",
	);
	
	const INVALID_FILES = array(
		".",
		"..",
		".DS_Store"
	);
	
	const MIME_TYPE_EXTENSIONS = array(
		
		"application/zip" => "zip",
	);
	
	const SUPPORTED_TYPES = array(
		
		//"gz",
		//"rar",
		//"tar",
		//"tar.gz",
		"zip",
	);
	
	public static $instance = null;
	public $manager = null;
	
	
	function __construct() {
		
		
	}
	
	public static function get_instance() {
		
		if ( null == self::$instance ) {
			
			self::$instance = new self;
		}
		
		return self::$instance;
	}
	
	public static function get_system() {
		
		$system = "unknown";
		
		if( strtoupper( substr( PHP_OS, 0, 3 ) ) === 'WIN' ) {
			
			$system = "windows";
		} else {
			
			$system = "linux";
		}
		return $system;
	}
	
	public static function compress( $path, $output = "default", $type = "default" ) {
		
		$response = array();
		
		if( $type == "default" ) {
			
			$type = self:: get_supported_type();
		}
		
		if( $output == "default" ) {
			
			$output = dirname( $path ) . "/" . basename( $path ) . ".$type";
			$path_parts = pathinfo( $output );
			$existing = $output;
			$i = 1;
			
			do {
				
				if( is_dir( $existing ) ) {
					
					$existing = rtrim( $output, "/" ) . " $i/";
				} elseif( is_file( $existing ) ) {
					
					if( isset( $path_parts["extension"] ) ) {
						
						$existing = str_replace( ".{$path_parts["extension"]}", " {$i}.{$path_parts["extension"]}", $output );
					} else {
						
						$existing = $output . " $i";
					}
				}
				$i++;
			} while( is_file( $existing ) || is_dir( $existing ) );
			
			$output = $existing;
		}
		
		$supported = self::supports( $type );
		$archive = self::get_instance();
		
		if( $supported["status"] === "success" ) {
			
			if( extension_loaded( self::EXTENSIONS["{$type}"] ) ) {
				
				$response = call_user_func( array( $archive, "{$type}_c" ), $path, $output );
			} else {
				
				//$response = $archive->execute( $type, "compress", $path, dirname( $path ) );
			}
		} else {
			
			$response = $supported;
		}
		return $response;
	}
	
	public static function decompress( $file, $output = "default" ) {
		
		$response = array();
		$path_info = pathinfo( $file );
		$type = isset( $path_info["extension"] ) ? $path_info["extension"] : null;
		$supported = self::supports( $type );
		$archive = self::get_instance();
		
		if( $output == "default" ) {
			
			$output = $path_info["dirname"] . "/" . $path_info["filename"];
		}
		
		if( $supported["status"] === "success" ) {
			
			if( extension_loaded( self::EXTENSIONS["{$type}"] ) ) {
				
				$response = call_user_func( array( $archive, "{$type}_d" ), $file, $output );
			} else {
				
				$response = $archive->execute( $type, "decompress" );
			}
			
			if( $response === true ) {
				
				$response = array(
					"status" => "success",
					"message" => null,
				);
			}
		} else {
			
			$response = $supported;
		}
		return $response;
	}
	
	public static function get_supported_type() {
		
		//zip is usually the most used format supported by the most OS's,
		//we check that first then check the rest of the types.
		
		$supported_type = null;
		$types = self::SUPPORTED_TYPES;
		$zip_id = array_search( "zip", $types );
		unset( $types[$zip_id] );
		array_unshift( $types, "zip" );
		
		foreach( $types as $id => $type ) {
			
			if( self::supports( $type ) ) {
				
				$supported_type = $type;
				break;
			}
		}
		return $supported_type;
	}
	
	public static function supports( $type ) {
		
		$response = array();
		$type = strtolower( $type );
		
		if( in_array( $type, self::SUPPORTED_TYPES ) ) {
			
			$system = self::get_system();
			$supported = false;
			$extension = self::EXTENSIONS["{$type}"];
			
			if( extension_loaded( $extension ) ) {
				
				$type_supported = true;
			} elseif( isset( self::COMMANDS["{$type}"] ) && isset( self::COMMANDS["{$type}"]["compress"][$system] ) ) {
				
				$type_supported = true;
			}
			
			if( $type_supported ) {
				
				$response["status"] = "success";
				$response["message"] = "Type is supported";
			} else {
				
				$response["status"] = "error";
				$response["message"] = "The extension or program required to use this type of file does not seem to be installed.";
			}
		} else {
			
			$response["status"] = "error";
			$response["message"] = "The filetype supplied is not currently supported by Codiad's archive management system.";
		}
		return $response;
	}
	
	function zip_c( $path, $output, &$archive = null ) {
		
		if( $archive == null ) {
			
			$path = rtrim( $path, '/' );
			//$output = rtrim( $output, '/' ) . '/';
			$archive = new ZipArchive();
			
			if( file_exists( $output ) ) {
				
				$result = $archive->open( $output, ZIPARCHIVE::OVERWRITE );
			} else {
				
				$result = $archive->open( $output, ZIPARCHIVE::CREATE );
			}
			
			if( $result !== true ) {
				
				return false;
			}
			
			if( is_file( $path ) ) {
				
				$archive->addFile( $path, basename( $path ) );
				$archive->close();
				return true;
			}
		}
		
		$i = new RecursiveIteratorIterator( new RecursiveDirectoryIterator( $path ) );
		
		foreach( $i as $file ) {
			
			$file_name = $file->getBasename();
			$file_path = $file->getPathname();
			$relative_path = str_replace( $path, "", $file_path );
			$relative_path = ltrim( $relative_path, '/' );
			
			if( in_array( $file_name, self::INVALID_FILES ) ) {
				
				continue;
			}
			
			if( is_file( $file_path ) ) {
				
				$archive->addFile( $file_path, $relative_path );
			} else {
				
				$archive->addEmptyDir( $relative_path );
				$this->zip_c( $file_path, $output, $archive );
			}
		}
		$archive->close();
		
		return true;
	}
	
	function zip_d( $path, $output ) {
		
		if( ! is_dir( $output ) ) {
			
			mkdir( $output );
		}
		
		$status = false;
		$output = rtrim( $output, '/' ) . '/';
		$archive = new ZipArchive();
		$open = $archive->open( $path );
		
		if ( $open === true ) {
			
			$archive->extractTo( $output );
			$archive->close();
			$status = true;
		}
		return $status;
	}
}


?>