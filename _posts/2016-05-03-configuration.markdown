---
layout: documentation
title:  "Configuring Write Forward"
category: documentation
---

# Configuring Write Forward

There are three methods that apply configuration to Write Forward:
 - A YAML file
 - System Properties
 - Programmatic configuration  

## System Properties

Currently Write Forward honors two system properties:

 - `writeforward.configuration`
  - Sets the location of the configuration file. Write Forward will first attempt to load the file on the classpath using `.getResourceAsStream(configLocation)`, and if that fails Write Forward will load it as a file using `new File(configLocation)`.
  - Type: String/Filepath
 - `writeforward.configuration.isslow`
  - Sets if Write Forward should perform the slow reflection operations: get stacktrace, find file/class/method/line the log was call from.
  - Type: boolean (true/false)

You can run your project with command line arguments. For example: `java -Dwriteforward.configuration="C:\Users\Me\MyProject\loggerconfig.yaml" -Dwriteforward.configuration.isslow="true" -jar myApplication.jar`

## YAML Config File

Write Forward Configuration Files are written in YAML.
**Do not put tabs in YAML files!** YAML does not like tabs in YAML files. Use spaces to indent your YAML files instead.

Write Forward checks the `writeforward.configuration` system property first for the location of the configuration file. If `writeforward.configuration` is not set or the configuration file is not where it is supposed to be, the Write Forward loads `write-forward-config.yaml` by using the class loader. It is recommended to put this configuration file in `/src/main/resources` in your project.

The structure of a configuration file is as follows, noting what is requires and what is optional:
{% raw %}

    writeforward: #REQUIRED: Root of the configuration. In theory other yaml content could be in here as well.
             isslow: true #OPTIONAL: If true performs slow reflection operations
             numberofstackframes: 5 #OPTIONAL: The number of stack frames to add to the message. Default 50..
             outputs: #REQUIRED sets what logging framework to log to.
                  - name: slf4j #REQUIRED: Logging framework to use.
                    format: |+ #REQUIRED: Formats the message using Pebble
                        ===================================================================================================================
                        [{{ level }}] {{ marker }} {{ timestamp }} {{ thread }} {% if class is not empty %}{{ class }}:{{ line }}{% endif %}

                        {{ message }}

                        {% if values is not empty %}
                        {% for value in values %}
                        {{ value.key }} = {{ value.value }}

                        {% endfor %}
                        {% endif %}
{% endraw %}

Outputs in the configuration file are a list. Each list entry outputs each log message to its own underlying frameworks.

Valid `name` for each `output` includes:
 - `slf4j` : Which writes out to slf4j
 - `javalogging`: Which writes out to java.util.logging
 - `console`: Which writes out to system.out

The `format` in each output only controls what message string is put in to the message field of each logger. Write Forward will attempt to input exceptions and markers, into the underlying framework nativly. For example, Write Forward will call `logger.error(message.getMarker().toSlf4jMarker(), message.getMessage(), message.getException());` in SLF4j.

## Programmatic configuration

Write Forward also has a programmatic API for setting the configuration.

    import org.writeforward.logger.Configurator;

    ...

    Configurator.build() //Starts a new programmatic configuration.
    .withOutput(new StandardOutput(new DefaultMessageFormatter())) //Sets a Output to write to.
    .commit(); // Commits the new configuration to be used.

See the JavaDocs for `org.writeforward.logger.MessageBuilder` for the full programatic API.

## What if a configuration is not found?

In the event a configuration is not found by the first time the logger is called, Write Forward attempts to configure itself.

If a configuration file is not found on the classpath, Write forward will check to see what logging frameworks are on the classpath, and load the default configuration for that framework is. It checks to see if Logback or Log4j is on the classpath, and if one is, it loads the default Logback or Log4j configuration file.

### Default Log4j configuration:
{% raw %}

    writeforward:
             isslow: true
             numberofstackframes: 5
             outputs:
                  - name: log4j
                    format: |-
                        {{ timestamp }} [{{ thread }}] {{ level }}{% if marker is not empty %} {{ marker }}{% endif %}{% if class is not empty %} {{ class }}:{{ line }}{% endif %} - {{ message }}
                        {% if values is not empty %}

                        {% for value in values %}
                        {{ value.key }} = {{ value.value }}

                        {% endfor %}
                        {% endif %}
{% endraw %}

### Default Logback configuration
{% raw %}

    writeforward: #Root of the configuration
             isslow: true #If true performs slow reflection operations
             numberofstackframes: 5 #Determines the max number of stack frames put into the message's stack trace.
             outputs:
                  - name: slf4j #Uses the default SLF4J outputter.
                    format: |+ #Formats the message using Pebble
                        ===================================================================================================================
                        [{{ level }}] {{ marker }} {{ timestamp }} {{ thread }} {% if class is not empty %}{{ class }}:{{ line }}{% endif %}

                        {{ message }}

                        {% if values is not empty %}
                        {% for value in values %}
                        {{ value.key }} = {{ value.value }}

                        {% endfor %}
                        {% endif %}
 {% endraw %}
