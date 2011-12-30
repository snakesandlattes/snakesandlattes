<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="text" encoding="iso-8859-1"/>

  <xsl:strip-space elements="*" />
  <xsl:template match="/">
   <!-- header -->
    <xsl:for-each select="/table/row[1]/*">
      <xsl:if test="position() != last()">"<xsl:value-of select="normalize-space(name())"/>",</xsl:if>
      <xsl:if test="position()  = last()">"<xsl:value-of select="normalize-space(name())"/>"<xsl:text>&#xD;</xsl:text></xsl:if>
    </xsl:for-each>

  <xsl:for-each select="/*/child::*">
    <xsl:for-each select="child::*">
      <xsl:if test="position() != last()">"<xsl:value-of select="normalize-space(.)"/>",</xsl:if>
      <xsl:if test="position()  = last()">"<xsl:value-of select="normalize-space(.)"/>"<xsl:text>&#xD;</xsl:text></xsl:if>
    </xsl:for-each>
  </xsl:for-each>

  </xsl:template>
</xsl:stylesheet>