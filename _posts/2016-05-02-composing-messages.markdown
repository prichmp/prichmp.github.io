---
layout: documentation
title:  "Composing messages"
category: documentation
---
# Composing messages

To compose a new message call `org.writeforward.logger.Log.message(String mesage)` add to the message using the `MessageBuilder` class, and then call a `.level()` to commit the message to be written.

**.trace(), .debug(), .info(), .warn(), .error(), .fatal() or .withLevel(Level l) must be the last method called on the message chain or else the message will not be written to the log**

Here is an example log:

    Log.message("This is a test")
    .withException(new IOException("of the emergency"))
    .withValue("Broadcasting", "System")
    .withValue("Had this been", aRealEmergency)
    .withMarker("INSTRUCTIONS")
    .withMarker("WOULDFOLLOW")
    .debug();

See the Javadoc for `org.writeforward.loggger.MessageBuilder` to see all message methods.

## Levels

Write Forward levels are essentially the same as Log4j levels, but different from SLF4J or java.util.logging levels. The following table shows the conversion between different levels.

<table>
<thead>
<tr><th>Write Forward Level</th><th>SLF4J Level</th><th>Log4J Level</th><th>java.util.logging level</th></tr>
</thead>
<tbody>
<tr><td>FATAL</td><td>ERROR</td> <td>FATAL</td> <td>SEVERE</td></tr>
<tr><td>ERROR</td><td>ERROR</td> <td>ERROR</td> <td>WARNING</td></tr>
<tr><td>WARN</td><td>WARN</td> <td>WARN</td> <td>WARNING</td></tr>
<tr><td>INFO</td><td>INFO</td> <td>INFO</td> <td>INFO</td></tr>
<tr><td>DEBUG</td><td>DEBUG</td> <td>DEBUG</td> <td>FINE</td></tr>
<tr><td>TRACE</td><td>TRACE</td> <td>TRACE</td> <td>FINER</td></tr>
</tbody>
</table>
