package ru.tsystems

import io.ktor.application.Application
import io.ktor.application.ApplicationCallPipeline
import io.ktor.application.call
import io.ktor.http.ContentType
import io.ktor.http.HttpStatusCode
import io.ktor.http.content.resources
import io.ktor.http.content.static
import io.ktor.request.httpMethod
import io.ktor.request.receive
import io.ktor.request.uri
import io.ktor.response.header
import io.ktor.response.respondText
import io.ktor.routing.routing
import io.ktor.util.KtorExperimentalAPI
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody
import okhttp3.RequestBody.Companion.toRequestBody
import java.net.InetAddress
import java.net.UnknownHostException


fun main(args: Array<String>): Unit = io.ktor.server.netty.EngineMain.main(args)

@KtorExperimentalAPI
@Suppress("unused")
@kotlin.jvm.JvmOverloads
fun Application.module(testing: Boolean = false) {

    val client = OkHttpClient()

    val host = environment.config.property("ktor.backend.host").getString()
    val port = environment.config.property("ktor.backend.port").getString()
    val schema = environment.config.property("ktor.backend.schema").getString()

    val ip: InetAddress
    var hostname: String? = null
    var hostAddress: String? = null
    val serverPort = environment.config.property("ktor.deployment.port").getString()

    try {
        ip = InetAddress.getLocalHost()
        hostname = ip.hostName
        hostAddress = ip.hostAddress
        println("Front app server hostname : $hostname")

    } catch (e: UnknownHostException) {
        e.printStackTrace()
    }

    intercept(ApplicationCallPipeline.Call) {
        val uri = call.request.uri
        if (uri.contains("api")) {
            val method = call.request.httpMethod.value
            var requestBody: RequestBody? = null;
            if (method.equals("POST")) {
                val body = call.receive<String>()
                requestBody = body.toRequestBody("application/json; charset=utf-8".toMediaType())
            }
            val request = Request.Builder()
                .url("$schema://$host:$port$uri")
                .method(method, requestBody)
                .build()
            val response = client.newCall(request).execute()
            val fullPath= "$hostname:$serverPort" + "|" + response.headers["Full-Path"]
            call.response.header("Full-Path", fullPath)
            call.respondText(response.body!!.string(), contentType = ContentType.Application.Json,
                status = HttpStatusCode.fromValue(response.code)
            )
        }
    }

    routing {
        static("/dev-ops-school") {
            resources("public")
        }

        //TODO: Hack for images after URL change, need to clarify why staticRootFolder doesn't work
        static("/dev-ops-school/index.html/static") {
            resources("public/static")
        }
    }
}