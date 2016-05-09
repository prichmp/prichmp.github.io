---
layout: documentation
title:  "Using java.util.logging"
category: documentation
---

# Using java.util.logging

Java comes with a built-in logger at java.util.logging.

## Project Setup

Add Write Forward to your project. Check the [download page]( {{ "/download.html" | prepend: site.baseurl }} ) for the current Write Forward version.

## Configuring Write Forward
To configure Write Forward the recommended way is to put a configuration file in the  `/src/main/resources/` folder in your Java, Scala, or Kotlin project.

Here is an example `/src/main/resources/write-forward-config.xml` file for Java Logging.

{% raw %}

    <?xml version="1.0" encoding="UTF-8"?>
    <writeforward slow="true" stackframes="50">
    	<outputs>
    		<output name="javalogging">
    <format>{{#marker}}{{marker}}{{/marker}} {{ message }}
      {{#values}}
      {{key}} = {{value}}
      {{/values}}</format>
    		</output>
    	</outputs>
    </writeforward>

{% endraw %}


## Configuring Java Logging
You can find java.util.logging configuration instructions by checking the [javadoc](https://docs.oracle.com/javase/8/docs/api/java/util/logging/LogManager.html).  


Generally, the java.util.logging defaults work great with Write Forward. If you want to set an output file the easiest way of doing that is with the command line argument/system property `java -Djava.util.logging.config.file=myLoggingConfigFilePath`



## Levels

Java.util.logging and Write Forward use different logging levels. The following table shows the mapping between Write Forward levels and java.util.logging levels.

<table>
<thead>
<tr><th>Write Forward Level</th><th>java.util.logging level</th></tr>
</thead>
<tbody>
<tr><td>FATAL</td><td>SEVERE</td></tr>
<tr><td>ERROR</td><td>WARNING</td></tr>
<tr><td>WARN</td><td>WARNING</td></tr>
<tr><td>INFO</td><td>INFO</td></tr>
<tr><td>DEBUG</td><td>FINE</td></tr>
<tr><td>TRACE</td><td>FINER</td></tr>
</tbody>
</table>
