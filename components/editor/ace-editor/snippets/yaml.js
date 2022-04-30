define("ace/snippets/yaml",["require","exports","module"],function(e,t,n){"use strict";t.snippetText='\
\
snippet articaine\n	articaine 4% 1:100000 adrenaline \n\
snippet mepivicaine\n	mepivicaine 3% \n\
snippet lignocaine\n	lignocaine 2% 1:80000 adrenaline \n\
snippet citanest\n	3% Citanest Dental with Octapressin \n\
\
snippet allergies\n	Allergies: ${1:None}\n\
snippet consent\n	Patient expressed intention to proceed with \n\
snippet epb\n	etch, prime, bond\n\
snippet eb\n	etch, bond\n\
snippet spf\n	scale, prophy, fluoride\n\
snippet sp\n	scale, prophy\n\
snippet pf\n	prophy, fluoride\n\
snippet io\n	Palate ${1:NAD}, floor of mouth ${2:NAD}, tongue ${3:NAD}, lips ${4:NAD}, mucosa ${5:NAD}\n\
snippet eo\n	TMJ ${1:NAD}, submandibular ${2:NAD}, swelling ${3:nil}, mouth opening ${4:NAD}\n\
snippet psr\n	PSR:\n	  [ ${1:0}, ${2:0}, ${3:0} ]\n	  [ ${4:0}, ${5:0}, ${6:0} ]\n\
snippet alginate\n	${1:Upper} alginate impression taken in ${2:M} stock tray\n\
snippet impregum\n	${1:Upper} impregum impression taken in ${2:special} tray\n\
snippet recall\n	${1:6}/12 recall\n\
snippet mins\n	(${1:30} minutes)\n\
snippet bitewings\n	Recommended bitewings ${1:in line with caries screening schedule}\n\
snippet ---\n	-----------------------------------------------------------------------------------------------------------------------------------------------------------\n\
\
snippet augmentin\n	Augmentin Duo Forte 875mg/125mg (${1:10}) 1 tablet 12 hourly PO\n\
snippet clindamycin\n	Clindamycin 150mg (${1:48}) 2 tablets 6 hourly PO\n\
snippet metronidazole\n	Metronidazole ${1:200}mg (${2:21}) 1 tablet 8 hourly PO\n\
snippet amoxicillin\n	Amoxicillin 500mg (${1:20}) 1 tablet 8 hourly PO\n\
snippet diclofenac\n	Diclofenac 50mg (${1:50}) 1 tablet 8 hourly PO PRN\n\
snippet pforte\n	Panadeine forte (${1:20}) 2 tablets 4-6 hourly PO PRN\n\
snippet oxycodone\n	Oxycodone HCl 5mg (${1:20}) 1 tablet 6 hourly PO PRN\n\
\
snippet exo \n\
	${1:\
- Warned risk of oroantral communication}\
	${2:\n\
	- Warned risk of sectional or surgical extraction}\
	${3:\n\
	- Warned risk of alveolar osteitis}\n\
\
snippet t_westfund\n\
	Time out procedure observed\n\
	P/C: ${1}\n\
	RFA: ${2}\n\
	PDH: ${3}\n\
	MHx: ${4}\n\
	SHx: ${5}\n\
	On examination:\n\
	  E/O: ${6}\n\
	  I/O: ${7}\n\
	  Periodontal: ${8}\n\
	Diagnosis: ${9}\n\
	Discussed treatment options: ${10}\n\
	Consent: ${11}\n\
	-----------------------------------------------------------------------------------------------------------------------------------------------------------\n\
	Today: ${12}\n\
	-----------------------------------------------------------------------------------------------------------------------------------------------------------\n\
	Advice and recommendations: ${13}\n\
	Exp: ${14}\n\
	N/V: ${15} (${16:30} mins)\n\
	DO: ${17:XJ}\n\
	DA: ${18}\n\
\
snippet t_blacktown\n\
	P/C: ${1}\n\
	RFA: ${2}\n\
	PDH: ${3}\n\
	MHx: ${4}\n\
	SHx: ${5}\n\
	On examination:\n\
	  E/O: ${6}\n\
	  I/O: ${7}\n\
	  Periodontal: ${8}\n\
	Diagnosis: ${9}\n\
	Discussed treatment options: ${10}\n\
	Consent: ${11}\n\
	Today: ${12}\n\
	Advice and recommendations: ${13}\n\
	Exp: ${14}\n\
	N/V: ${15} (${16:30} mins)\n\
	DO: ${17:XJ}\n\
	DA: ${18}\n\
\
snippet [\n	[${1:text}](http://${2:address} "${3:title}")\n\
snippet [*\n	[${1:link}](${2:`@*`} "${3:title}")${4}\n\n\
snippet [:\n	[${1:id}]: http://${2:url} "${3:title}"\n\
snippet [:*\n	[${1:id}]: ${2:`@*`} "${3:title}"\n\n\
snippet ![\n	![${1:alttext}](${2:/images/image.jpg} "${3:title}")\n\
snippet ![*\n	![${1:alt}](${2:`@*`} "${3:title}")${4}\n\n\
snippet ![:\n	![${1:id}]: ${2:url} "${3:title}"\n\
snippet ![:*\n	![${1:id}]: ${2:`@*`} "${3:title}"\n\n\
snippet ===\nregex /^/=+/=*//\n	${PREV_LINE/./=/g}\n	\n	${0}\n\
snippet ---\nregex /^/-+/-*//\n	${PREV_LINE/./-/g}\n	\n	${0}\n\
snippet blockquote\n	{% blockquote %}\n	${1:quote}\n	{% endblockquote %}\n\n\
snippet blockquote-author\n	{% blockquote ${1:author}, ${2:title} %}\n	${3:quote}\n	{% endblockquote %}\n\n\
snippet blockquote-link\n	{% blockquote ${1:author} ${2:URL} ${3:link_text} %}\n	${4:quote}\n	{% endblockquote %}\n\n\
snippet bt-codeblock-short\n	```\n	${1:code_snippet}\n	```\n\n\
snippet bt-codeblock-full\n	``` ${1:language} ${2:title} ${3:URL} ${4:link_text}\n	${5:code_snippet}\n	```\n\n\
snippet codeblock-short\n	{% codeblock %}\n	${1:code_snippet}\n	{% endcodeblock %}\n\n\
snippet codeblock-full\n	{% codeblock ${1:title} lang:${2:language} ${3:URL} ${4:link_text} %}\n	${5:code_snippet}\n	{% endcodeblock %}\n\n\
snippet gist-full\n	{% gist ${1:gist_id} ${2:filename} %}\n\nsnippet gist-short\n	{% gist ${1:gist_id} %}\n\n\
snippet img\n	{% img ${1:class} ${2:URL} ${3:width} ${4:height} ${5:title_text} ${6:alt_text} %}\n\n\
snippet youtube\n	{% youtube ${1:video_id} %}\n\n# The quote should appear only once in the text. It is inherently part of it.\n# See http://octopress.org/docs/plugins/pullquote/ for more info.\n\n\
snippet pullquote\n	{% pullquote %}\n	${1:text} {" ${2:quote} "} ${3:text}\n	{% endpullquote %}\n\
\
                  ',t.scope="yaml"});                (function() {
                    window.require(["ace/snippets/yaml"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
