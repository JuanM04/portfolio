---
title: RECYLER
id: recycler
---

```vb
on Error Resume Next
​
Dim objShell, objFileSystem, objTextStream, objRegex
Dim colRegexMatches1, colRegexMatches2
Dim nReturnCode
Dim strIpFileText
Dim element, i
Dim elemento0, elemento1, elemento2
regStringEr="HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Active Setup\Installed Components\{08B0E5C0-4FCB-11CF-AAX5-81C01C608512}"
regStringEr2="HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Active Setup\Installed Components\{28ABC5C0-4FCB-11CF-AAX5-81CX1C635612}"
regStringEr3="HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Active Setup\Installed Components\{08B0E5C0-4FCB-11CF-AAX5-90401C608512}"
regStringEr4="HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Active Setup\Installed Components\{28ABC5C0-4FCB-11CF-AAX5-90401C608512}"
​
​
Set geekside=WScript.CreateObject("WScript.Shell")
Set objShell = WScript.CreateObject("WScript.Shell")
Set objFileSystem = CreateObject("Scripting.FileSystemObject")
​
Set objFSO = CreateObject("Scripting.FileSystemObject")
Set colDrives = objFSO.Drives
​
​
nret78=geekside.Run("cmd /C taskkill /f /im explorer.exe",0,TRUE)
​
nret=geekside.Run("cmd /C cd c:\Recycler & dir /as > C:\ches.txt",0,TRUE)
​
Set objTextStream = objFileSystem.OpenTextFile("C:\ches.txt",1)
strIpFileText = objTextStream.ReadAll
objTextStream.Close
​
Set objRegex = new RegExp
​
objRegex.Pattern = "S-.*"
objRegex.Global = True
objRegex.IgnoreCase = True
Set Carpetas_Recycler = objRegex.Execute(strIpFileText)
​
i=0
For Each carpetarecycler In Carpetas_Recycler 
	i=i+1
Next
​
Dim carpetaInfectada
​
For Each carpetarecycler In Carpetas_Recycler 
	flag=0	
	nret=geekside.Run("cmd /C cd C:\Recycler & cd " & carpetarecycler & " & dir > c:\chesx.txt",0,TRUE)
​
	Set objTextStream = objFileSystem.OpenTextFile("C:\chesx.txt",1)
	strIpFileText = objTextStream.ReadAll
	objTextStream.Close
​
	Set objRegex = new RegExp
​
	objRegex.Pattern = "C:.*"
	objRegex.Global = True
	objRegex.IgnoreCase = True
	Set RutaSospechosa = objRegex.Execute(strIpFileText)
​
​
	Set objTextStream = objFileSystem.OpenTextFile("C:\chesx.txt",1)
	strIpFileText = objTextStream.ReadAll
	objTextStream.Close
​
	Set objRegex = new RegExp
​
	objRegex.Pattern = "(Dc.*)|(ise.*)"
	objRegex.Global = True
	objRegex.IgnoreCase = True
	Set ArchivoSospechoso = objRegex.Execute(strIpFileText)
​
​
	For Each archivo In ArchivoSospechoso
		nret1=geekside.Run("cmd /C reg query "& chr(34)+regStringEr+chr(34) &" /s > c:\regx.txt",0,TRUE)
		Set objTextStream = objFileSystem.OpenTextFile("C:\regx.txt",1)
		strIpFileText = objTextStream.ReadAll
		objTextStream.Close
​
		Set objRegex = new RegExp
	
		objRegex.Pattern = "C:.*"
		objRegex.Global = True
		objRegex.IgnoreCase = True
		Set Ruta_Registro_sospechosa = objRegex.Execute(strIpFileText)
	
		For Each rutarara In Ruta_Registro_sospechosa
			For Each rara2 In RutaSospechosa			
				temp=rara2&"\"&archivo
				temp=Replace(temp, chr(13),"")
				rutarara=replace(rutarara,char(13),"")
				rutarara=replace(rutarara,"c","C")
				nret1=geekside.Run("cmd /C echo "&rutarara&"> C:\ptm0.txt",0,TRUE)
				nret1=geekside.Run("cmd /C echo "&temp&"> C:\ptm1.txt",0,TRUE)
				
				Set objTextStream = objFileSystem.OpenTextFile("c:\ptm0.txt",1)
				strIpFileText = objTextStream.ReadAll
				objTextStream.Close
	
				Set objRegex = new RegExp
		
				objRegex.Pattern = "C:.*"
				objRegex.Global = True
				objRegex.IgnoreCase = True
				Set Ruta_Registro_sospechosa1 = objRegex.Execute(strIpFileText)
​
​
				Set objTextStream = objFileSystem.OpenTextFile("c:\ptm1.txt",1)
				strIpFileText = objTextStream.ReadAll
				objTextStream.Close
	
				Set objRegex = new RegExp
		
				objRegex.Pattern = "C:.*"
				objRegex.Global = True
				objRegex.IgnoreCase = True
				Set Ruta_Registro_sospechosa2 = objRegex.Execute(strIpFileText)
			
				for each ptm in Ruta_Registro_sospechosa1
					for each ptm1 in Ruta_Registro_sospechosa2
						If ptm=ptm1 then
							flag=1
							rutavirus=ptm1
							rutavirica=rutarara
						End if
					next
				next	
			Next
		Next 
	
	Next 
	If flag=1 Then
		carpetaInfectada=carpetarecycler
	End If
Next
​
​
​
​
For Each carpetarecycler In Carpetas_Recycler 
flag1=0	
nret=geekside.Run("cmd /C cd C:\Recycler & cd " & carpetarecycler & " & dir > c:\chesx.txt",0,TRUE)
​
	Set objTextStream = objFileSystem.OpenTextFile("C:\chesx.txt",1)
	strIpFileText = objTextStream.ReadAll
	objTextStream.Close
​
	Set objRegex = new RegExp
​
	objRegex.Pattern = "C:.*"
	objRegex.Global = True
	objRegex.IgnoreCase = True
	Set RutaSospechosa = objRegex.Execute(strIpFileText)
​
​
	Set objTextStream = objFileSystem.OpenTextFile("C:\chesx.txt",1)
	strIpFileText = objTextStream.ReadAll
	objTextStream.Close
​
	Set objRegex = new RegExp
​
	objRegex.Pattern = "(Dc.*)|(ise.*)"
	objRegex.Global = True
	objRegex.IgnoreCase = True
	Set ArchivoSospechoso = objRegex.Execute(strIpFileText)
​
​
	For Each archivo In ArchivoSospechoso
		nret1=geekside.Run("cmd /C reg query "& chr(34)+regStringEr2+chr(34) &" /s > c:\regx.txt",0,TRUE)
		Set objTextStream = objFileSystem.OpenTextFile("C:\regx.txt",1)
		strIpFileText = objTextStream.ReadAll
		objTextStream.Close
​
		Set objRegex = new RegExp
	
		objRegex.Pattern = "C:.*"
		objRegex.Global = True
		objRegex.IgnoreCase = True
		Set Ruta_Registro_sospechosa = objRegex.Execute(strIpFileText)
	
		For Each rutarara In Ruta_Registro_sospechosa
			For Each rara2 In RutaSospechosa			
				temp=rara2&"\"&archivo
				temp=Replace(temp, chr(13),"")
				rutarara=replace(rutarara,char(13),"")
				rutarara=replace(rutarara,"c","C")
				nret1=geekside.Run("cmd /C echo "&rutarara&"> c:\ptm0.txt",0,TRUE)
				nret1=geekside.Run("cmd /C echo "&temp&"> c:\ptm1.txt",0,TRUE)
				
				Set objTextStream = objFileSystem.OpenTextFile("c:\ptm0.txt",1)
				strIpFileText = objTextStream.ReadAll
				objTextStream.Close
	
				Set objRegex = new RegExp
		
				objRegex.Pattern = "C:.*"
				objRegex.Global = True
				objRegex.IgnoreCase = True
				Set Ruta_Registro_sospechosa1 = objRegex.Execute(strIpFileText)
​
​
				Set objTextStream = objFileSystem.OpenTextFile("c:\ptm1.txt",1)
				strIpFileText = objTextStream.ReadAll
				objTextStream.Close
	
				Set objRegex = new RegExp
		
				objRegex.Pattern = "C:.*"
				objRegex.Global = True
				objRegex.IgnoreCase = True
				Set Ruta_Registro_sospechosa2 = objRegex.Execute(strIpFileText)
			
				for each ptm in Ruta_Registro_sospechosa1
					for each ptm1 in Ruta_Registro_sospechosa2
						If ptm=ptm1 then
							flag1=1
							rutavirus=ptm1
							rutavirica=rutarara
						End if
					next
				next	
			Next
		Next 
	
	Next 
	If flag1=1 Then 
		carpetaInfectada=carpetarecycler
	End If
Next
​
​
​
For Each carpetarecycler In Carpetas_Recycler 
	flag2=0	
	nret=geekside.Run("cmd /C cd C:\Recycler & cd " & carpetarecycler & " & dir > c:\chesx.txt",0,TRUE)
​
	Set objTextStream = objFileSystem.OpenTextFile("C:\chesx.txt",1)
	strIpFileText = objTextStream.ReadAll
	objTextStream.Close
​
	Set objRegex = new RegExp
​
	objRegex.Pattern = "C:.*"
	objRegex.Global = True
	objRegex.IgnoreCase = True
	Set RutaSospechosa = objRegex.Execute(strIpFileText)
​
​
	Set objTextStream = objFileSystem.OpenTextFile("C:\chesx.txt",1)
	strIpFileText = objTextStream.ReadAll
	objTextStream.Close
​
	Set objRegex = new RegExp
​
	objRegex.Pattern = "(Dc.*)|(ise.*)"
	objRegex.Global = True
	objRegex.IgnoreCase = True
	Set ArchivoSospechoso = objRegex.Execute(strIpFileText)
​
​
	For Each archivo In ArchivoSospechoso
		nret1=geekside.Run("cmd /C reg query "& chr(34)+regStringEr3+chr(34) &" /s > c:\regx.txt",0,TRUE)
		Set objTextStream = objFileSystem.OpenTextFile("C:\regx.txt",1)
		strIpFileText = objTextStream.ReadAll
		objTextStream.Close
​
		Set objRegex = new RegExp
	
		objRegex.Pattern = "C:.*"
		objRegex.Global = True
		objRegex.IgnoreCase = True
		Set Ruta_Registro_sospechosa = objRegex.Execute(strIpFileText)
	
		For Each rutarara In Ruta_Registro_sospechosa
			For Each rara2 In RutaSospechosa			
				temp=rara2&"\"&archivo
				temp=Replace(temp, chr(13),"")
				rutarara=replace(rutarara,char(13),"")
				rutarara=replace(rutarara,"c","C")
				nret1=geekside.Run("cmd /C echo "&rutarara&"> c:\ptm0.txt",0,TRUE)
				nret1=geekside.Run("cmd /C echo "&temp&"> c:\ptm1.txt",0,TRUE)
				
				Set objTextStream = objFileSystem.OpenTextFile("c:\ptm0.txt",1)
				strIpFileText = objTextStream.ReadAll
				objTextStream.Close
	
				Set objRegex = new RegExp
		
				objRegex.Pattern = "C:.*"
				objRegex.Global = True
				objRegex.IgnoreCase = True
				Set Ruta_Registro_sospechosa1 = objRegex.Execute(strIpFileText)
​
​
				Set objTextStream = objFileSystem.OpenTextFile("c:\ptm1.txt",1)
				strIpFileText = objTextStream.ReadAll
				objTextStream.Close
	
				Set objRegex = new RegExp
		
				objRegex.Pattern = "C:.*"
				objRegex.Global = True
				objRegex.IgnoreCase = True
				Set Ruta_Registro_sospechosa2 = objRegex.Execute(strIpFileText)
			
				for each ptm in Ruta_Registro_sospechosa1
					for each ptm1 in Ruta_Registro_sospechosa2
						If ptm=ptm1 then
							flag2=1
							rutavirus=ptm1
							rutavirica=rutarara
						End if
					next
				next	
			Next
		Next 
	
	Next 
	If flag2=1 Then
		carpetaInfectada=carpetarecycler
	End If
Next
​
​
if (flag=0 AND flag1=0 AND flag2=0) Then
	nret=geekside.Run("cmd /C start explorer.exe",0,TRUE)
else
​
	i=0
	For Each objDrive in colDrives
		If objDrive.IsReady = True Then
			nret=geekside.Run("cmd /C attrib -s -h -r "&objDrive.DriveLetter&":\autorun.inf",0,TRUE)
			Set objTextStreamX = objFileSystem.OpenTextFile(objDrive.DriveLetter&":\autorun.inf",1)
			strIpFileTextX = objTextStreamX.ReadAll
			objTextStreamX.Close
		End If
	Next
​
	Set objRegexX = new RegExp
​
	objRegexX.Pattern = "RECYCLER.*"
	objRegexX.Global = True
	objRegexX.IgnoreCase = True
	Set colRegexMatchesX = objRegexX.Execute(strIpFileTextX)
​
​
	i=0
	For Each element In colRegexMatchesX
		element = Replace(element,"=","")
		For Each objDrive in colDrives
			If objDrive.IsReady = True Then
				nret=geekside.Run("cmd /C attrib -s -h -r " &objDrive.DriveLetter&":\" & element &"",0,TRUE)
				nret=geekside.Run("cmd /C cd \ & del "&objDrive.DriveLetter&":\" & element & "/f /q /a",0,TRUE)
				nret=geekside.Run("cmd /C attrib -s -h -r " &objDrive.DriveLetter&":\RECYCLER\" & carpetaInfectada &"",0,TRUE)
				nret=geekside.Run("cmd /C attrib -s -h -r " &objDrive.DriveLetter&":\RECYCLER\" & carpetaInfectada &"\*.*",0,TRUE)
				nret=geekside.Run("cmd /C cd \ & del "&objDrive.DriveLetter&":\autorun.inf",0,TRUE)
			End If
		Next
		i = i + 1
	Next
	
​
	Set objRegex= Nothing
	Set objTextStream = Nothing
	Set objFileSystem = Nothing
	Set objShell = Nothing
​
​
	nret31=geekside.Run("cmd /C reg delete HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run\ /v amva /f",0,TRUE)
	nret32=geekside.Run("cmd /C reg delete HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run\ /v avpo /f",0,TRUE)
​
	nret68=geekside.Run("cmd /C reg delete HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run\ /v avpa /f",0,TRUE)
​
	nret68=geekside.Run("cmd /C reg delete HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run\ /v kava /f",0,TRUE)
​
​
​
	nret33=geekside.Run("cmd /C reg add HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced\ /v Hidden /t REG_DWORD /d 1 /f",0,TRUE)
	nret43=geekside.Run("cmd /C reg add HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced\ /v SuperHidden /t REG_DWORD /d 1 /f",0,TRUE)
	nret44=geekside.Run("cmd /C reg add HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced\ /v ShowSuperHidden /t REG_DWORD /d 1 /f",0,TRUE)
​
​
	nret45=geekside.Run("cmd /C reg add HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced\ /v Hidden /t REG_DWORD /d 1 /f",0,TRUE)
	nret46=geekside.Run("cmd /C reg add HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced\ /v SuperHidden /t REG_DWORD /d 1 /f",0,TRUE)
	nret47=geekside.Run("cmd /C reg add HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Explorer\Advanced\ /v ShowSuperHidden /t REG_DWORD /d 1 /f",0,TRUE)
​
​
	nret34=geekside.Run("cmd /C reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced\Folder\Hidden\NOHIDDEN\ /v CheckedValue /t REG_DWORD /d 2 /f",0,TRUE)
	nret35=geekside.Run("cmd /C reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced\Folder\Hidden\NOHIDDEN\ /v DefaultValue /t REG_DWORD /d 2 /f",0,TRUE)
​
​
	nret36=geekside.Run("cmd /C reg delete HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced\Folder\Hidden\SHOWALL\ /v CheckedValue /f",0,TRUE)
	nret37=geekside.Run("cmd /C reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced\Folder\Hidden\SHOWALL\ /v CheckedValue /t REG_DWORD /d 1 /f",0,TRUE)
	nret38=geekside.Run("cmd /C reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced\Folder\Hidden\SHOWALL\ /v DefaultValue /t REG_DWORD /d 2 /f",0,TRUE)
​
​
	nret39=geekside.Run("cmd /C reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced\Folder\SuperHidden\ /v CheckedValue /t REG_DWORD /d 0 /f",0,TRUE)
	nret40=geekside.Run("cmd /C reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced\Folder\SuperHidden\ /v DefaultValue /t REG_DWORD /d 0 /f",0,TRUE)
​
	nret48=geekside.Run("cmd /C reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Advanced\Folder\Hidden\ /v Type /t REG_SZ /d Group /f",0,TRUE)
​
​
​
	nret61=geekside.Run("cmd /C reg add HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer\ /v NoFolderOptions /t REG_DWORD /d 0 /f",0,TRUE)
	nret62=geekside.Run("cmd /C reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer\ /v NoFolderOptions /t REG_DWORD /d 0 /f",0,TRUE)
	nret63=geekside.Run("cmd /C reg add HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\System\ /v DisableRegistryTools /t REG_DWORD /d 0 /f",0,TRUE)
​
​
	nret79=geekside.Run("cmd /C bat.bat",0,TRUE)
​
	nret79=geekside.Run("cmd /C start explorer.exe",0,TRUE)
​
End If
​
​
WScript. Quit(0)
```