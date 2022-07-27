cmake_minimum_required(VERSION 3.0.0)
project(RobotHunterBJS VERSION 0.1.0)

set(BABYLON_NATIVE_BUILD_APPS OFF)
add_subdirectory(BabylonNative)

set(BUILD_SHARED_LIBS "Build shared libraries" OFF)
set(GLFW_BUILD_EXAMPLES "Build the GLFW example programs" OFF)
set(GLFW_BUILD_TESTS "Build the GLFW test programs" OFF)
set(GLFW_BUILD_DOCS "Build the GLFW documentation" OFF)
set(GLFW_INSTALL "Generate installation target" OFF)
set(GLFW_LIBRARY_TYPE "STATIC")
add_subdirectory(glfw)

set(BABYLON_JS_SCRIPTS
    "Scripts/babylonjs.loaders.js"
    "Scripts/babylon.max.js"
    "Scripts/babylonjs.materials.js"
    "Scripts/babylon.gui.js"
    "Scripts/app.js"
    "Scripts/meshwriter.min.js"
    "Scripts/ammo.js")

set(GAME_MODELS
    "Models/enemy.glb"
    "Models/littleRobot.glb")

set(GAME_TEXTURES
    "Textures/character_basecolor.png"
    "Textures/character_emission.png")


add_executable(RobotHunterBJS main.cpp ${BABYLON_JS_SCRIPTS} ${GAME_MODELS} ${GAME_TEXTURES})

target_link_libraries(RobotHunterBJS 
    PRIVATE AppRuntime
    PRIVATE NativeEngine
    PRIVATE NativeInput
    PRIVATE NativeOptimizations
    PRIVATE Console
    PRIVATE Window
    PRIVATE ScriptLoader
    PRIVATE XMLHttpRequest
    PRIVATE Canvas
    PRIVATE glfw
    ${ADDITIONAL_LIBRARIES}
    ${BABYLON_NATIVE_PLAYGROUND_EXTENSION_LIBRARIES})

target_compile_features(RobotHunterBJS PRIVATE cxx_std_17)

foreach(SCRIPT ${BABYLON_JS_SCRIPTS})
    get_filename_component(SCRIPT_NAME "${SCRIPT}" NAME)
    add_custom_command(
        OUTPUT "${CMAKE_CFG_INTDIR}/Scripts/${SCRIPT_NAME}"
        COMMAND "${CMAKE_COMMAND}" -E copy "${CMAKE_CURRENT_SOURCE_DIR}/${SCRIPT}" "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_CFG_INTDIR}/Scripts/${SCRIPT_NAME}"
        COMMENT "Copying ${SCRIPT_NAME}"
        MAIN_DEPENDENCY "${CMAKE_CURRENT_SOURCE_DIR}/${SCRIPT}")
endforeach()

foreach(MODEL ${GAME_MODELS})
    get_filename_component(MODEL_NAME "${MODEL}" NAME)
    add_custom_command(
        OUTPUT "${CMAKE_CFG_INTDIR}/Models/${MODEL_NAME}"
        COMMAND "${CMAKE_COMMAND}" -E copy "${CMAKE_CURRENT_SOURCE_DIR}/${MODEL}" "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_CFG_INTDIR}/Models/${MODEL_NAME}"
        COMMENT "Copying ${MODEL_NAME}"
        MAIN_DEPENDENCY "${CMAKE_CURRENT_SOURCE_DIR}/${MODEL}")
endforeach()

foreach(TEXTURE ${GAME_TEXTURES})
    get_filename_component(TEXTURE_NAME "${TEXTURE}" NAME)
    add_custom_command(
        OUTPUT "${CMAKE_CFG_INTDIR}/Textures/${TEXTURE_NAME}"
        COMMAND "${CMAKE_COMMAND}" -E copy "${CMAKE_CURRENT_SOURCE_DIR}/${TEXTURE}" "${CMAKE_CURRENT_BINARY_DIR}/${CMAKE_CFG_INTDIR}/Textures/${TEXTURE_NAME}"
        COMMENT "Copying ${TEXTURE_NAME}"
        MAIN_DEPENDENCY "${CMAKE_CURRENT_SOURCE_DIR}/${TEXTURE}")
endforeach()

source_group(TREE ${CMAKE_CURRENT_SOURCE_DIR} FILES ${BABYLON_JS_SCRIPTS})
source_group(TREE ${CMAKE_CURRENT_SOURCE_DIR} FILES ${GAME_MODELS})
source_group(TREE ${CMAKE_CURRENT_SOURCE_DIR} FILES ${GAME_TEXTURES})