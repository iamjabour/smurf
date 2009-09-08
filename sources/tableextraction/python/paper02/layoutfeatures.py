#!/usr/bin/python2.5

import libxml2dom
import htmltodom
import sys
import xml.dom.minidom as md
import urllib

def pprint(node, h=0):

	if node.nodeType == node.ELEMENT_NODE:
		tag = "%s < %s " % (' '*h, node.localName)
		for att in node.attributes:
			tag += "%s='%s' " % (att.localName, att.nodeValue)
		tag += ">"
		print tag

	elif node.nodeType == node.TEXT_NODE:
		if len(node.nodeValue.replace(' ', '')) > 0:
			print ' '*h, '< TXT >' 
			print ' '*h, node.nodeValue

	for child in node.childNodes:
		pprint(child,h+1)

	if node.nodeType == node.ELEMENT_NODE:
		print ' '*h, '</', node.localName, '>'

	elif node.nodeType == node.TEXT_NODE:
		if len(node.nodeValue.replace(' ', '')) > 0:
			print ' '*h, '</ TXT >'

def findTables(node):

	find = False
	tables = []

	for child in node.childNodes:
		(find_table, table) = findTables(child)
		tables += table
		if find_table:
			find = True
	
	if find:
		return (True, tables)

	if node.nodeType == node.ELEMENT_NODE:
		if node.localName.lower() == 'table':
			tables += [node]
			return (True, tables)

	return (False, [])

def tableCountRC(table):

	rows = 0 
	columns = 0

	for child in table.childNodes:
		if table.nodeType == table.ELEMENT_NODE:
			name = child.localName.lower()
			if name == 'tr':
				rows += 1
				print 'line:', rows
				cCount(child)
			elif name == 'br':
				rows +=1
			else:
				continue
		#if
	#for
	return (rows, columns)
#def

def cCount(line):
	rowspans = 0
	columns = 0
	for child in line.childNodes:
		inf = ""
		if line.nodeType == line.ELEMENT_NODE:
			name = child.localName.lower()
			
			if name == 'td' or name == 'th':
				colspan = child.getAttribute('colspan')
				rowspan = child.getAttribute('rowspan')

				if colspan:
					columns += int(colspan)
					inf += "colspan: %s " % int(colspan) 
				else:
					columns += 1

				if rowspan:
					rowspans += 1
					inf += "rowspan: %s " % int(rowspan)

				print 'columns:', columns, inf
			else:
				continue
		#if
	#for
#def

if __name__ == '__main__':

	if len(sys.argv) < 2:
		raise SystemExit, "use: %s <URI>" %sys.argv[0]

	filePath = sys.argv[1]

	if filePath[0:4] == "http":
		import urllib
		htmlString = urllib.urlopen(filePath).read()
	else:
		htmlString = open(filePath,'r').read()

	dom = htmltodom.parse(htmlString)
	# pprint(dom)
	(find, tables) = findTables(dom)
	
	for t in tables:
		print '#' * 60
		(r,c) = tableCountRC(t)
		print 'rows:', r, 'columns:', c
		# pprint(t)


