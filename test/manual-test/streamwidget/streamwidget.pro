######################################################################
# Automatically generated by qmake
# > qmake.exe -project
######################################################################

TEMPLATE = app
TARGET   = StreamWidget
QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

CONFIG   += c++11

gcc|clang{
    QMAKE_CFLAGS += -std=c99
    QMAKE_CXXFLAGS += -std=c++11
}

lessThan(QT_VERSION, 5.0) {
    warning("prefere to build it with Qt 5.0")
}


#-------------------------------------------------
# Dependencies
#-------------------------------------------------
HEADERS += \
    $$PWD/../../../src/core/checkabletablemodel.h \
    $$PWD/../../../src/core/format.h \
    $$PWD/../../../src/core/stream.h \
    $$PWD/../../../src/core/theme.h \
    $$PWD/../../../src/widgets/checkableitemdelegate.h \
    $$PWD/../../../src/widgets/checkabletableview.h \
    $$PWD/../../../src/widgets/customstyle.h \
    $$PWD/../../../src/widgets/customstyleoptionprogressbar.h \
    $$PWD/../../../src/widgets/globals.h \
    $$PWD/../../../src/widgets/streamformatpicker.h \
    $$PWD/../../../src/widgets/streamlistwidget.h \
    $$PWD/../../../src/widgets/streamwidget.h \
    $$PWD/../../../test/utils/dummystreamfactory.h

SOURCES += \
    $$PWD/../../../src/core/checkabletablemodel.cpp \
    $$PWD/../../../src/core/format.cpp \
    $$PWD/../../../src/core/stream.cpp \
    $$PWD/../../../src/core/theme.cpp \
    $$PWD/../../../src/widgets/checkableitemdelegate.cpp \
    $$PWD/../../../src/widgets/checkabletableview.cpp \
    $$PWD/../../../src/widgets/customstyle.cpp \
    $$PWD/../../../src/widgets/customstyleoptionprogressbar.cpp \
    $$PWD/../../../src/widgets/streamformatpicker.cpp \
    $$PWD/../../../src/widgets/streamlistwidget.cpp \
    $$PWD/../../../src/widgets/streamwidget.cpp \
    $$PWD/../../../test/utils/dummystreamfactory.cpp

FORMS += \
    $$PWD/../../../src/widgets/streamformatpicker.ui \
    $$PWD/../../../src/widgets/streamlistwidget.ui \
    $$PWD/../../../src/widgets/streamwidget.ui


#-------------------------------------------------
# INCLUDE
#-------------------------------------------------
INCLUDEPATH += $$PWD/../../../include/


#-------------------------------------------------
# SOURCES
#-------------------------------------------------
HEADERS += \
    $$PWD/mainwindow.h

SOURCES += \
    $$PWD/mainwindow.cpp \
    $$PWD/main.cpp

FORMS += \
    $$PWD/mainwindow.ui


#-------------------------------------------------
# RESOURCES
#-------------------------------------------------
RESOURCES += $$PWD/../../../src/resources.qrc

win32|unix {
    RC_FILE += $$PWD/../../../src/resources_win.rc
}


#-------------------------------------------------
# BUILD OPTIONS
#-------------------------------------------------

# Rem: On Ubuntu, directories starting with '.' are hidden by default
win32{
    MOC_DIR =      ./.moc
    OBJECTS_DIR =  ./.obj
    UI_DIR =       ./.ui
}else{
    MOC_DIR =      ./_moc
    OBJECTS_DIR =  ./_obj
    UI_DIR =       ./_ui
}

#-------------------------------------------------
# OUTPUT
#-------------------------------------------------


#-------------------------------------------------
# TARGET DIRECTORY
#-------------------------------------------------
# Needs to define a subfolder, as the *.DLL
# cannot be copied in the root folder.
DESTDIR = $${OUT_PWD}/../../../manual_test_install


#-------------------------------------------------
# INSTALL
#-------------------------------------------------
# Remark:
# =======
# Eventually, in your favorite IDE, replace build chain command
#   'make'
# by
#   'make install'
#
# It will install the DLLs, documentation, data, etc.
# that are required to execute the application.
#

# instructions for 'make install'

# install Qt binaries (for Windows only)
# This is a hack for 'windeployqt'
win32{
    CONFIG(debug,debug|release){
        platform_plugin_to_copy.files += $$[QT_INSTALL_PLUGINS]/platforms/qminimald.dll
        platform_plugin_to_copy.files += $$[QT_INSTALL_PLUGINS]/platforms/qwindowsd.dll
        platform_plugin_to_copy.path = $${DESTDIR}/platforms
        INSTALLS += platform_plugin_to_copy

        imageformats_plugin_to_copy.files += $$[QT_INSTALL_PLUGINS]/imageformats/qgifd.dll
        imageformats_plugin_to_copy.files += $$[QT_INSTALL_PLUGINS]/imageformats/qicod.dll
        imageformats_plugin_to_copy.files += $$[QT_INSTALL_PLUGINS]/imageformats/qjpegd.dll
        imageformats_plugin_to_copy.path = $${DESTDIR}/imageformats
        INSTALLS += imageformats_plugin_to_copy

        icon_engine_plugin_to_copy.files += $$[QT_INSTALL_PLUGINS]/iconengines/qsvgicond.dll
        icon_engine_plugin_to_copy.path = $${DESTDIR}/iconengines
        INSTALLS += icon_engine_plugin_to_copy

        style_plugin_to_copy.files += $$[QT_INSTALL_PLUGINS]/styles/qwindowsvistastyled.dll
        style_plugin_to_copy.path = $${DESTDIR}/styles
        INSTALLS += style_plugin_to_copy
    }else{
        platform_plugin_to_copy.files += $$[QT_INSTALL_PLUGINS]/platforms/qminimal.dll
        platform_plugin_to_copy.files += $$[QT_INSTALL_PLUGINS]/platforms/qwindows.dll
        platform_plugin_to_copy.path = $${DESTDIR}/platforms
        INSTALLS += platform_plugin_to_copy

        imageformats_plugin_to_copy.files += $$[QT_INSTALL_PLUGINS]/imageformats/qgif.dll
        imageformats_plugin_to_copy.files += $$[QT_INSTALL_PLUGINS]/imageformats/qico.dll
        imageformats_plugin_to_copy.files += $$[QT_INSTALL_PLUGINS]/imageformats/qjpeg.dll
        imageformats_plugin_to_copy.path = $${DESTDIR}/imageformats
        INSTALLS += imageformats_plugin_to_copy

        icon_engine_plugin_to_copy.files += $$[QT_INSTALL_PLUGINS]/iconengines/qsvgicon.dll
        icon_engine_plugin_to_copy.path = $${DESTDIR}/iconengines
        INSTALLS += icon_engine_plugin_to_copy

        style_plugin_to_copy.files += $$[QT_INSTALL_PLUGINS]/styles/qwindowsvistastyle.dll
        style_plugin_to_copy.path = $${DESTDIR}/styles
        INSTALLS += style_plugin_to_copy
    }
}

# install yt-dlp (for Windows only)
win32{
    youtube_dl_executable_to_copy.files += $$PWD/../../../3rd/yt-dlp/bin/yt-dlp.exe
    youtube_dl_executable_to_copy.path = $${DESTDIR}
    INSTALLS += youtube_dl_executable_to_copy
}
