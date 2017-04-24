<!DOCTYPE html>
<html>
<head>
	<title>Alternate is a system for decision makers</title>
	<script src="js/jquery.js"></script> 
	<link rel="stylesheet" type="text/css" href="css/main.css">
	<link rel="stylesheet" type="text/css" href="css/font-awesome/css/font-awesome.min.css">
	<script src="js/main.js"></script>
	<script src="js/numeric.js"></script> 
</head>
<body>
	<div class="main-wr">
		<div class="main-navbar">
			<div class="navbar-wr">
				<ul class="nav">
					<li class="mnav-items mnav-item-1 selected"><div><i class="fa fa-home" aria-hidden="true"></i> <span>Главная</div></span></li> 
					<li class="mnav-items mnav-item-2"><div><i class="fa fa-cogs" aria-hidden="true"></i> <span>Параметры</div></span></li>
					<li class="mnav-items mnav-item-3"><div><i class="fa fa-sitemap" aria-hidden="true"></i> <span>Критерии</div></span></li>
					<li class="mnav-items mnav-item-4"><div><i class="fa fa-sliders" aria-hidden="true"></i></i> <span>Альтернативы</span></div></li>
					<li class="mnav-items mnav-item-5"><div><i class="fa fa-trophy" aria-hidden="true"></i> <span>Итог</span></div></li>
					<li class="mnav-items mnav-item-6"><div><i class="fa fa-bar-chart" aria-hidden="true"></i><span>On</span></div></li>
					<li class="mnav-items mnav-item-7"><div><i class="fa fa-question-circle-o" aria-hidden="true"></i> <span>Справка</span></div></li>
				</ul>
			</div>
		</div>
		<div class="main-actionarea">

			<div class="block-nav-items block-nav-item-1 selected"> 
				<div><div class="main-button-mp">Начать</div></div>
			</div>
			<div class="block-nav-items block-nav-item-2 selected">
				<h2>Параметры</h2>
				<div class="input-data-wr hap-step">

					<div class="add-goal-wr">
					<h3>Цель:</h3>
						<div class="goal-title">Ваша цель:</div>
						<div class="the-goal">Цель</div>
						<i class="fa fa-pencil-square-o change-goal" aria-hidden="true"></i>
					</div> 

					<div class="cri-alt-wr">
						<div class="criteria-wr items-wrapper"> 
						<h3>Критерии:</h3>
							<div id="exist-crit-wr" class="exist-items-wr">
								<span class='no-objects'>Критерии не добавлены</span>
							</div>
							<div id="add-new-crit" class="add-item button-1"><i class="fa fa-plus-square-o" aria-hidden="true"></i> <span>Добавить критерий</span></div>
							<div id="remove-all-crit" class="remove-all-items button-2"><i class="fa fa-minus-square-o" aria-hidden="true"></i> <span>Удалить все критерии</span></div>
						</div> 

						<div class="alterntives-wr items-wrapper">
						<h3>Альтернативы:</h3>
							<div id="exist-alter-wr" class="exist-items-wr">
								<span class='no-objects'>Альтернативы не добавлены</span>  
							</div>
							<div id="add-new-altern" class="add-item button-1"><i class="fa fa-plus-square-o" aria-hidden="true"></i> <span>Добавить альтернативу</span></div>
							<div id="remove-all-alterns" class="remove-all-items button-2"><i class="fa fa-minus-square-o" aria-hidden="true"></i> <span>Удалить все альтернативы</span></div>
						</div>
					</div>
					
					<br/>

					<div>
						<div class="gotomainpage button-3 button-prev"><i class="fa fa-long-arrow-left" aria-hidden="true"></i> <span>Вернуться на главную</span></div>
						<div class="gotopaircrit button-3 button-next"><span>Перейти к сравнению критериев</span> <i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
					</div>
					<br/>
				</div> 

			</div>

			<div class="block-nav-items block-nav-item-3">
				<datalist id="rangeList">
				<option value='-7' label="-7"><option value="-3" label="-3"><option value="0" label="0">
				<option value="3" label="3"><option value="7" label="7"> 
				</datalist> 

				<h2>Критерии</h2>
				<div class="comp-pair-crit"> 
					<div>Задайте критерии, чтобы перейти к сравнениям</div>
				</div>

				<div class="gotoparampage button-3 button-prev"><i class="fa fa-long-arrow-left" aria-hidden="true"></i> <span>Вернуться к параметрам</span></div>
				<div class="gotopairalter button-3 button-next"><span>Перейти к сравнению альтернатив</span> <i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
				<br/>
				<div class="itog-fixed-window">
					
				</div>
				<br/>
			</div>
			<div class="block-nav-items block-nav-item-4">

				<h2>Альтернативы</h2>
				<div class="comp-pair-alter-wr">  
					<div>Задайте альтернативы, чтобы перейти к сравнениям</div>
				</div>

				<div class='buttons-alter-itog'> 
					<div class="gotocritpage button-3 button-prev"><i class="fa fa-long-arrow-left" aria-hidden="true"></i> <span>Вернуться к сравнению критериев</span></div>
					<div class="gotomatr-inp button-3 button-next"><span>Итог</span> <i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>
				</div>
				<br/>
				<div class="itog-fixed-window">
					
				</div>
				<br/>
				<!--<div class="gotomatrix-crit"></div> 
				<input class="gotomatr-inp-crit" type="button" value="Построить матрицу критериев"></input> -->


			</div>
			<div class="block-nav-items block-nav-item-5">
			<h2>Итог</h2>
				<div class="gotomatrix"></div> 
			</div>

		</div>


	</div>	


</body>
</html>
 