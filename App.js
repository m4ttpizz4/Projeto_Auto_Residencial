import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  TextInput,
  Modal,
  Button,
  Image,
  Appearance,
  useColorScheme,
  StatusBar,
  SafeAreaView
} from 'react-native';

const AppCasaInteligente = () => {
  const esquemaDeCores = useColorScheme();
  const [modoEscuro, setModoEscuro] = useState(esquemaDeCores === 'false');
  const [telaSplashVisivel, setTelaSplashVisivel] = useState(true);
  const [luzSala, setLuzSala] = useState(false);
  const [luzCozinha, setLuzCozinha] = useState(false);
  const [luzQuarto, setLuzQuarto] = useState(false);
  const [arCondicionadoLigado, setArCondicionadoLigado] = useState(false);
  const [temperatura, setTemperatura] = useState(22);
  const [segurancaAtiva, setSegurancaAtiva] = useState(false);
  const [cenarioSelecionado, setCenarioSelecionado] = useState(null);
  const [cenariosPersonalizados, setCenariosPersonalizados] = useState({});
  const [modalVisivel, setModalVisivel] = useState(false);
  const [nomeNovoCenario, setNomeNovoCenario] = useState('');
  const [configuracoesNovoCenario, setConfiguracoesNovoCenario] = useState({
    luzSala: false,
    luzCozinha: false,
    luzQuarto: false,
    arCondicionadoLigado: false,
    temperatura: 22,
    segurancaAtiva: false,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTelaSplashVisivel(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const alternarModoEscuro = (modo) => {
    setModoEscuro(modo);
  };

  const cenariosPredefinidos = {
    manha: {
      nome: 'Manhã',
      acoes: () => {
        setLuzSala(true);
        setLuzCozinha(true);
        setLuzQuarto(false);
        setArCondicionadoLigado(false);
        setSegurancaAtiva(false);
        setCenarioSelecionado('manha');
      },
    },
    noite: {
      nome: 'Noite',
      acoes: () => {
        setLuzSala(true);
        setLuzCozinha(false);
        setLuzQuarto(true);
        setArCondicionadoLigado(true);
        setTemperatura(24);
        setSegurancaAtiva(true);
        setCenarioSelecionado('noite');
      },
    },
    fora: {
      nome: 'Fora de casa',
      acoes: () => {
        setLuzSala(false);
        setLuzCozinha(false);
        setLuzQuarto(false);
        setArCondicionadoLigado(false);
        setSegurancaAtiva(true);
        setCenarioSelecionado('fora');
      },
    },
  };

  const alternarSeguranca = () => {
    setSegurancaAtiva(!segurancaAtiva);
  };

  const abrirModalNovoCenario = () => {
    setConfiguracoesNovoCenario({
      luzSala,
      luzCozinha,
      luzQuarto,
      arCondicionadoLigado,
      temperatura,
      segurancaAtiva,
    });
    setModalVisivel(true);
  };

  const salvarCenarioPersonalizado = () => {
    if (!nomeNovoCenario.trim()) return;
    
    const chaveCenario = `personalizado_${Date.now()}`;
    
    const novoCenario = {
      nome: nomeNovoCenario,
      acoes: () => {
        setLuzSala(configuracoesNovoCenario.luzSala);
        setLuzCozinha(configuracoesNovoCenario.luzCozinha);
        setLuzQuarto(configuracoesNovoCenario.luzQuarto);
        setArCondicionadoLigado(configuracoesNovoCenario.arCondicionadoLigado);
        setTemperatura(configuracoesNovoCenario.temperatura);
        setSegurancaAtiva(configuracoesNovoCenario.segurancaAtiva);
        setCenarioSelecionado(chaveCenario);
      },
    };
    
    setCenariosPersonalizados(prev => ({
      ...prev,
      [chaveCenario]: novoCenario
    }));
    
    setNomeNovoCenario('');
    setModalVisivel(false);
  };

  const excluirCenarioPersonalizado = (chave) => {
    const novosCenarios = {...cenariosPersonalizados};
    delete novosCenarios[chave];
    setCenariosPersonalizados(novosCenarios);
    if (cenarioSelecionado === chave) {
      setCenarioSelecionado(null);
    }
  };

  const estilosDinamicos = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: modoEscuro ? '#121212' : '#f5f5f5',
      paddingTop: StatusBar.currentHeight,
    },
    cabecalho: {
      marginBottom: 24,
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    titulo: {
      fontSize: 28,
      fontWeight: 'bold',
      color: modoEscuro ? '#fff' : '#333',
    },
    subtitulo: {
      fontSize: 16,
      color: modoEscuro ? '#aaa' : '#666',
    },
    secao: {
      backgroundColor: modoEscuro ? '#1e1e1e' : 'white',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      marginHorizontal: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: modoEscuro ? 0 : 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    tituloSecao: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 12,
      color: modoEscuro ? '#fff' : '#444',
    },
    tituloSubsecao: {
      fontSize: 16,
      fontWeight: '600',
      marginVertical: 8,
      color: modoEscuro ? '#ccc' : '#555',
    },
    linhaDispositivo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: modoEscuro ? '#333' : '#eee',
    },
    texto: {
      color: modoEscuro ? '#fff' : '#000',
    },
    botaoCenario: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: modoEscuro ? '#333' : '#eee',
      flex: 1,
      margin: 4,
      alignItems: 'center',
      minWidth: '30%',
    },
    botaoCenarioAtivo: {
      backgroundColor: '#2196F3',
    },
    botaoAdicionarCenario: {
      marginTop: 12,
      padding: 12,
      borderRadius: 8,
      backgroundColor: '#2196F3',
      alignItems: 'center',
      marginHorizontal: 16,
    },
    entrada: {
      borderWidth: 1,
      borderColor: modoEscuro ? '#333' : '#ddd',
      borderRadius: 6,
      padding: 10,
      marginBottom: 20,
      color: modoEscuro ? '#fff' : '#000',
      backgroundColor: modoEscuro ? '#333' : '#fff',
    },
    linhaConfiguracao: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: modoEscuro ? '#333' : '#eee',
    },
    botaoModo: {
      padding: 8,
      borderRadius: 20,
      marginHorizontal: 4,
      borderWidth: 1,
      borderColor: modoEscuro ? '#444' : '#ddd',
    },
    botaoModoAtivo: {
      backgroundColor: '#2196F3',
      borderColor: '#2196F3',
    },
    textoBotaoModo: {
      fontSize: 20,
    },
  });

  if (telaSplashVisivel) {
    return (
      <View style={[estilosDinamicos.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Image source={require('./logo.png')} style={{ width: 150, height: 150, marginBottom: 20 }} />
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}>Casa Inteligente</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={estilosDinamicos.container}>
      <ScrollView>
        <View style={estilosDinamicos.cabecalho}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={estilosDinamicos.titulo}>Casa Inteligente</Text>
              <Text style={estilosDinamicos.subtitulo}>Bem-vindo de volta!</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={[
                  estilosDinamicos.botaoModo,
                  !modoEscuro && estilosDinamicos.botaoModoAtivo
                ]}
                onPress={() => alternarModoEscuro(false)}>
                <Text style={[
                  estilosDinamicos.textoBotaoModo,
                  { color: !modoEscuro ? 'white' : (modoEscuro ? '#fff' : '#000') }
                ]}>☀️</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  estilosDinamicos.botaoModo,
                  modoEscuro && estilosDinamicos.botaoModoAtivo
                ]}
                onPress={() => alternarModoEscuro(true)}>
                <Text style={[
                  estilosDinamicos.textoBotaoModo,
                  { color: modoEscuro ? 'white' : (modoEscuro ? '#fff' : '#000') }
                ]}>🌙</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={estilosDinamicos.secao}>
          <Text style={estilosDinamicos.tituloSecao}>Iluminação</Text>
          <View style={estilosDinamicos.linhaDispositivo}>
            <Text style={estilosDinamicos.texto}>Sala de Estar</Text>
            <Switch 
              value={luzSala} 
              onValueChange={setLuzSala} 
            />
          </View>
          <View style={estilosDinamicos.linhaDispositivo}>
            <Text style={estilosDinamicos.texto}>Cozinha</Text>
            <Switch 
              value={luzCozinha} 
              onValueChange={setLuzCozinha} 
            />
          </View>
          <View style={estilosDinamicos.linhaDispositivo}>
            <Text style={estilosDinamicos.texto}>Quarto</Text>
            <Switch 
              value={luzQuarto} 
              onValueChange={setLuzQuarto} 
            />
          </View>
        </View>

        <View style={estilosDinamicos.secao}>
          <Text style={estilosDinamicos.tituloSecao}>Climatização</Text>
          <View style={estilosDinamicos.linhaDispositivo}>
            <Text style={estilosDinamicos.texto}>Ar Condicionado</Text>
            <Switch 
              value={arCondicionadoLigado} 
              onValueChange={setArCondicionadoLigado} 
            />
          </View>
          {arCondicionadoLigado && (
            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <Text style={estilosDinamicos.texto}>Temperatura: {temperatura}°C</Text>
              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <TouchableOpacity
                  style={[estilosDinamicos.botaoCenario, { width: 40, height: 40, borderRadius: 20, marginHorizontal: 10 }]}
                  onPress={() => setTemperatura(t => Math.min(30, t + 1))}>
                  <Text style={estilosDinamicos.texto}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[estilosDinamicos.botaoCenario, { width: 40, height: 40, borderRadius: 20, marginHorizontal: 10 }]}
                  onPress={() => setTemperatura(t => Math.max(16, t - 1))}>
                  <Text style={estilosDinamicos.texto}>-</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View style={estilosDinamicos.secao}>
          <Text style={estilosDinamicos.tituloSecao}>Fechaduras</Text>
          <TouchableOpacity
            style={[
              { padding: 16, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
              segurancaAtiva ? { backgroundColor: '#4CAF50' } : { backgroundColor: '#F44336' }
            ]}
            onPress={alternarSeguranca}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              {segurancaAtiva ? 'Trancadas' : 'Destrancadas'}
            </Text>
            <Text style={{ color: 'white', fontSize: 12, opacity: 0.8 }}>
              {segurancaAtiva ? 'Toque para destrancar' : 'Toque para trancar'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={estilosDinamicos.secao}>
          <Text style={estilosDinamicos.tituloSecao}>Cenários</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            {Object.keys(cenariosPredefinidos).map((chave) => (
              <TouchableOpacity
                key={chave}
                style={[
                  estilosDinamicos.botaoCenario,
                  cenarioSelecionado === chave && estilosDinamicos.botaoCenarioAtivo,
                ]}
                onPress={() => cenariosPredefinidos[chave].acoes()}>
                <Text style={estilosDinamicos.texto}>{cenariosPredefinidos[chave].nome}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {Object.keys(cenariosPersonalizados).length > 0 && (
            <View style={{ marginTop: 12 }}>
              <Text style={estilosDinamicos.tituloSubsecao}>Seus Cenários</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                {Object.keys(cenariosPersonalizados).map((chave) => (
                  <View key={chave} style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                    <TouchableOpacity
                      style={[
                        estilosDinamicos.botaoCenario,
                        cenarioSelecionado === chave && estilosDinamicos.botaoCenarioAtivo,
                        { flex: 1 }
                      ]}
                      onPress={() => cenariosPersonalizados[chave].acoes()}>
                      <Text style={estilosDinamicos.texto}>{cenariosPersonalizados[chave].nome}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ padding: 8, marginLeft: 4 }}
                      onPress={() => excluirCenarioPersonalizado(chave)}>
                      <Text style={{ fontSize: 20, color: '#F44336' }}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}

          <TouchableOpacity
            style={estilosDinamicos.botaoAdicionarCenario}
            onPress={abrirModalNovoCenario}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>+ Criar Novo Cenário</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisivel}
          onRequestClose={() => setModalVisivel(false)}>
          <View style={[estilosDinamicos.container, { padding: 20 }]}>
            <Text style={[estilosDinamicos.titulo, { textAlign: 'center', marginBottom: 20 }]}>Criar Novo Cenário</Text>
            
            <TextInput
              style={estilosDinamicos.entrada}
              placeholder="Nome do cenário"
              placeholderTextColor={modoEscuro ? '#aaa' : '#888'}
              value={nomeNovoCenario}
              onChangeText={setNomeNovoCenario}
            />
            
            <Text style={[estilosDinamicos.tituloSecao, { marginBottom: 12 }]}>Configurações Atuais:</Text>
            
            <View style={estilosDinamicos.linhaConfiguracao}>
              <Text style={estilosDinamicos.texto}>Sala de Estar</Text>
              <Switch 
                value={configuracoesNovoCenario.luzSala} 
                onValueChange={(value) => setConfiguracoesNovoCenario({...configuracoesNovoCenario, luzSala: value})}
              />
            </View>
            
            <View style={estilosDinamicos.linhaConfiguracao}>
              <Text style={estilosDinamicos.texto}>Cozinha</Text>
              <Switch 
                value={configuracoesNovoCenario.luzCozinha} 
                onValueChange={(value) => setConfiguracoesNovoCenario({...configuracoesNovoCenario, luzCozinha: value})}
              />
            </View>
            
            <View style={estilosDinamicos.linhaConfiguracao}>
              <Text style={estilosDinamicos.texto}>Quarto</Text>
              <Switch 
                value={configuracoesNovoCenario.luzQuarto} 
                onValueChange={(value) => setConfiguracoesNovoCenario({...configuracoesNovoCenario, luzQuarto: value})}
              />
            </View>
            
            <View style={estilosDinamicos.linhaConfiguracao}>
              <Text style={estilosDinamicos.texto}>Ar Condicionado</Text>
              <Switch 
                value={configuracoesNovoCenario.arCondicionadoLigado} 
                onValueChange={(value) => setConfiguracoesNovoCenario({...configuracoesNovoCenario, arCondicionadoLigado: value})}
              />
            </View>
            
            {configuracoesNovoCenario.arCondicionadoLigado && (
              <View style={{ marginVertical: 10, alignItems: 'center' }}>
                <Text style={estilosDinamicos.texto}>Temperatura: {configuracoesNovoCenario.temperatura}°C</Text>
                <View style={{ flexDirection: 'row', marginTop: 8 }}>
                  <TouchableOpacity
                    style={[estilosDinamicos.botaoCenario, { width: 40, height: 40, borderRadius: 20, marginHorizontal: 10 }]}
                    onPress={() => setConfiguracoesNovoCenario({
                      ...configuracoesNovoCenario,
                      temperatura: Math.min(30, configuracoesNovoCenario.temperatura + 1)
                    })}>
                    <Text style={estilosDinamicos.texto}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[estilosDinamicos.botaoCenario, { width: 40, height: 40, borderRadius: 20, marginHorizontal: 10 }]}
                    onPress={() => setConfiguracoesNovoCenario({
                      ...configuracoesNovoCenario,
                      temperatura: Math.max(16, configuracoesNovoCenario.temperatura - 1)
                    })}>
                    <Text style={estilosDinamicos.texto}>-</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            
            <View style={estilosDinamicos.linhaConfiguracao}>
              <Text style={estilosDinamicos.texto}>Sistema de Segurança</Text>
              <Switch 
                value={configuracoesNovoCenario.segurancaAtiva} 
                onValueChange={(value) => setConfiguracoesNovoCenario({...configuracoesNovoCenario, segurancaAtiva: value})}
              />
            </View>
            
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
              <Button 
                title="Cancelar" 
                onPress={() => setModalVisivel(false)} 
              />
              <Button 
                title="Salvar" 
                onPress={salvarCenarioPersonalizado} 
                color="#2196F3"
              />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppCasaInteligente;
