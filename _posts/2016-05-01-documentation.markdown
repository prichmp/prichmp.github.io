---
layout: documentation
title:  "Homepage"
permalink: /documentation.html
category: permalink
---

# Getting Started

In order to get started with Write Forward several things need to happen. Here's a list of what needs to be set for Write Forward to work.

 1. Configure a logging framework (like Log4J or Logback).
 2. Ensure Write Forward is on the classpath.
 3. Configure Write Forward.

Once these three things are done Write forward should then work. See how to do each of these three tasks see the remainder of the documentation.

## Setting up a Logging Framework
Consult the documentation of your favorite logging framework for configuration help.

Write Forward does need some specific things from the Logging Framework:

 - Since the logging framework can't determine where the logging call originally came from Write Forward outputs the logging call location as part of the message. You can turn off any reflexive call-location features.
 - The Write Forward output format and the logging framework format must work together, or else you could get duplicate times, locations, markers, or levels in your log file.

## Installing Write Forward

There are several ways to add Write Forward to your classpath:

 - Download the [source](https://github.com/prichmp/Write-Forward/archive/master.zip) from Github.
 - Download the JAR file.
 - Use Maven, Gradle, SBT  etc. to add Write Forward to your build.


## Configuring Write Forward

There are a couple of ways to configure Write Forward:

 - The preferred method is to put write-forward-config.yaml file in /src/main/resources.
 - You can also set the configuration programmatically.
 - Set limited setting using system properties.
